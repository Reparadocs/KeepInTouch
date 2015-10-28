/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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

var KeepInTouch = React.createClass({
  getInitialState: function() {
    return {
      accessToken: null,
    }
  },

  renderScene: function(route, navigator) {
    console.log(this.state.accessToken);
    if (!this.state.accessToken) {
      FBSDKAccessToken.getCurrentAccessToken((token) => {
        if (token) {
          this.setState({accessToken: token.tokenString});
        }
      });
      return (
        <LoginView onLogin={this._onLogin} />
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

  _onLogout: function() {
    FBSDKAccessToken.setCurrentAccessToken(null);
    this.setState({accessToken: null});
  },

  _onLogin: function() {
    FBSDKAccessToken.getCurrentAccessToken((token) => {
      if (token) {
        this.setState({accessToken: token.tokenString});
      }
    });
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
