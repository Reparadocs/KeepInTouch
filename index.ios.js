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
} = React;

var FBSDKCore = require('react-native-fbsdkcore');
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var KeepInTouch = React.createClass({
  render: function() {
    return (
        <View style={styles.container}>
        <Image source={require('image!intro')} style={styles.image}>
        <Text style={styles.title}>KeepInTouch</Text>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCanceled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={['publish_actions']}/>
        <Image source={require('image!white')} style={styles.button}>
        <Text style={styles.buttonText}>Login without Facebook</Text>
        </Image>
        </Image>
        </View>
    );
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
