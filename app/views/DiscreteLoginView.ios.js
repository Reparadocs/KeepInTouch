'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight,
} = React;

var api = require('../network/api.js');

var DiscreteLoginView = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
    };
  },

  render: function() {
    return (
        <View style={styles.container}>
          <Image source={require('image!intro')} style={styles.image}>
            <TextInput style={{color: 'white', borderWidth: 2, borderColor: 'white',  height: 40}} />
            <Text style={styles.title}>KeepInTouch</Text>
            <TextInput style={{height: 40, color: 'white', borderColor: 'gray', borderWidth: 1}}
 placeholder='Username' onChangeText={(text) => this.setState({text})} />
            <TextInput placeholder='Password' onChangeText={(text) => this.setState({text})} />
            <TouchableHighlight onPress={this._onLogin}>
              <Image source={require('image!white')} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Image>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._onCreate}>
              <Image source={require('image!white')} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
              </Image>
            </TouchableHighlight>
          </Image>
        </View>
    );
  },

  _onLogin: function() {
    api.post('auth/login/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        this.setState({'token': responseData.token});
      })
      .done();
  },

  _onCreate: function() {
    api.post('auth/create/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        this.setState({'token': responseData.token});
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    color: 'white',
    flex: 1,
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

module.exports = DiscreteLoginView;
