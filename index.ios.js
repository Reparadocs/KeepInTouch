'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  View,
  Image,
  Navigator,
} = React;

var FBSDKCore = require('react-native-fbsdkcore');
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKAccessToken,
} = FBSDKCore;
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var LoginView = require('./app/auth/views/LoginView.ios.js');
var MainView = require('./app/contacts/views/MainView.ios.js');
var DiscreteLoginView = require('./app/auth/views/DiscreteLoginView.ios.js');
var LoadingView = require('./app/auth/views/LoadingView.ios.js');
var api = require('./app/global/api.js');
var storage = require('./app/global/storage.js');

var KeepInTouch = React.createClass({
  getInitialState: function() {
    return {
      token: null,
      spinner: true,
    }
  },

  componentDidMount: function() {
    this._loadInitialStorage().done();
  },

  _loadInitialStorage: async function() {
    var storageObj =  await storage.loadStorage();
    var tokenSet = false;
    if (storageObj) {
      if (storageObj.token) {
        this.setState({token: storageObj.token});
        api.access_token = storageObj.token;
        tokenSet = true;
      }
    }
    if (!tokenSet) {
      this._authenticate();
    }
    this.setState({spinner: false});
  },

  renderScene: function(route, navigator) {
    if (this.state.spinner) {
      return (
        <LoadingView />
      );
    }
    if (route.id === 'DiscreteLogin') {
      return (
        <DiscreteLoginView onLogin={this._setToken} navigator={navigator} />
      );
    }
    console.log(this.state.token);
    if (!this.state.token) {
      return (
        <LoginView onLogin={this._authenticate} navigator={navigator} />
      );
    }
    if (route.id === 'Main') {
      return (
        <MainView onLogout={this._onLogout} />
      );
    }
  },

  render: function() {
    return (
        <Navigator
          initialRoute={{id: 'Main', index: 0}}
          configureScene={() => Navigator.SceneConfigs.PushFromRight}
          renderScene={this.renderScene}
        />
    );
  },

  _authenticate: function() {
    FBSDKAccessToken.getCurrentAccessToken((access_token) => {
      if (access_token) {
        api.post('auth/facebook/', {access_token: access_token.tokenString})
          .then((responseData) => {
            this._setToken(responseData.token).done();
          })
          .done();
      }
    })
  },

  _setToken: async function(token) {
    this.setState({token});
    await storage.onValueChange('token', token);
    api.access_token = token;
  },

  _onLogout: async function() {
    FBSDKAccessToken.setCurrentAccessToken(null);
    this.setState({token: null});
    await storage.removeStorage('token');
  }
});

AppRegistry.registerComponent('KeepInTouch', () => KeepInTouch);
