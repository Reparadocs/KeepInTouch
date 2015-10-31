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
  TouchableOpacity,
  ActivityIndicatorIOS,
  NavigatorIOS,
} = React;

var api = require('../global/api.js');

var DiscreteLoginView = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      errors: null,
      spinner: false,
    };
  },

  render: function() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        transparent={true}
        initialRoute={{
          onLeftButtonPress: () => this.props.navigator.pop(),
          leftButtonTitle: '<',
          component: DiscreteLogin,
          title: 'Login',
          passProps: {
            onLogin: this.props.onLogin,
            nav: this.props.navigator,
          }
        }}
      />
    );
  }
});

var DiscreteLogin = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      errors: null,
      spinner: false,
    };
  },

  render: function() {
    var spinner = null;
    var errorBox = null;
    if (this.state.spinner) {
      spinner = <ActivityIndicatorIOS animating={true} size="large" />;
    } else if (this.state.errors) {
      errorBox = <Text style={styles.errors}>{this.state.errors}</Text>;
    }
    return (
        <View style={styles.container}>
          <Image source={require('image!login')} style={styles.image}>
            <View style={{width: 300, marginTop: 50}}>
            <TextInput
              style={styles.input}
              placeholder='Username'
              onChangeText={(username) => this.setState({username})}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder='Password'
              onChangeText={(password) => this.setState({password})}
            />
            </View>
            <TouchableOpacity onPress={this._onLogin}>
              <Image source={require('image!white')} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onCreate}>
              <Image source={require('image!white')} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
              </Image>
            </TouchableOpacity>
            {spinner}
            {errorBox}
          </Image>
        </View>
    );
  },

  _onLogin: function() {
    this.setState({spinner: true})
    api.post('auth/login/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        if (responseData.token) {
          this.props.onLogin(responseData.token);
          this.props.nav.push({
            id: 'Main',
          });
        } else {
          console.log(responseData);
          this.setState({errors: responseData.errors, spinner: false})
        }
      })
      .done();
  },

  _onCreate: function() {
    this.setState({spinner: true});
    api.post('auth/create/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        if (responseData.token) {
          this.props.onLogin(responseData.token);
          this.props.nav.push({
            id: 'Main',
          });
        } else {
          this.setState({errors: responseData.errors, spinner: false});
        }
      })
      .done();
  },

  handleBackButtonPress: function() {
    this.props.nav.push({id: 'Main'});
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  errors: {
    backgroundColor: 'rgba(256,0,0,0.5)',
    padding: 10,
    color:'rgba(256,256,256,0.9)',
    width: 300,
    height: 40,
    borderRadius: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor:'rgba(256,256,256,0.6)',
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
    padding: 4,
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
    marginBottom: 10,
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
