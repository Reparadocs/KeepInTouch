'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
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

var LoginView = require('./app/views/LoginView.ios.js');
var MainView = require('./app/views/MainView.ios.js');
var DiscreteLoginView = require('./app/views/DiscreteLoginView.ios.js');
var api = require('./app/network/api.js');

var KeepInTouch = React.createClass({
  getInitialState: function() {
    return {
      token: null,
    }
  },

  componentDidMount: function() {
    if (!this.state.token) {
      this._authenticate();
    }
  },

  renderScene: function(route, navigator) {
    if (route.id === 'DiscreteLogin') {
      return (
        <DiscreteLoginView onLogin={this._authenticate} navigator={navigator} />
      );
    }
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
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
          renderScene={this.renderScene}
        />
    );
  },

  _authenticate: function() {
    FBSDKAccessToken.getCurrentAccessToken((access_token) => {
      if (access_token) {
        api.post('auth/facebook/', {access_token: access_token.tokenString})
          .then((responseData) => {
            this.setState({'token': responseData.token});
          })
          .done();
      }
    })
  },

  _onLogout: function() {
    FBSDKAccessToken.setCurrentAccessToken(null);
    this.setState({token: null});
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    width: 200,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
  title: {
    color: 'orange',
    fontFamily: 'Baskerville',
    fontStyle: 'italic',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 400,
  }
});

AppRegistry.registerComponent('KeepInTouch', () => KeepInTouch);
