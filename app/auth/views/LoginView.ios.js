'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} = React;

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

var LoginView = React.createClass({
  render: function() {
    return (
        <View style={styles.container}>
          <Image source={require('image!intro')} style={styles.image}>
            <FBSDKLoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  alert('Error logging in.');
                } else {
                  if (result.isCancelled) {
                    alert('Login cancelled.');
                  } else {
                    this.props.onLogin();
                  }
                }
              }}
              readPermissions={[]}
              publishPermissions={[]}
            />
            <TouchableOpacity onPress={this._onDiscreteLogin}>
              <Image source={require('image!white')} style={styles.button}>
                <Text style={styles.buttonText}>Login without Facebook</Text>
              </Image>
            </TouchableOpacity>
          </Image>
        </View>
    );
  },

  _onDiscreteLogin: function() {
    this.props.navigator.push({
      id: 'DiscreteLogin',
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
    padding: 50,
    justifyContent: 'flex-end',
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
  }
});

module.exports = LoginView;
