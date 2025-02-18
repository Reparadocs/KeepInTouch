'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TextInput,
  TouchableOpacity,
  ActivityIndicatorIOS,
} = React;

var api = require('../../global/api.js');
var Button = require('../../global/components/Button.ios.js');

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
    var spinner = null;
    var errorBox = null;
    var loginButtons = null;
    if (this.state.spinner) {
      spinner = <ActivityIndicatorIOS animating={true} size="large" />;
    } else if (this.state.errors) {
      errorBox = <Text style={styles.errors}>{this.state.errors}</Text>;
    }
    if (!this.state.spinner) {
      loginButtons =
        <View>
          <Button buttonText='Login' onPress={this._onLogin} />
          <Button buttonText='Create Account' onPress={this._onCreate} />
        </View>;
    }
    return (
        <View style={styles.container}>
          <Image source={require('image!login')} style={styles.image}>
            <View style={styles.topContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(password) => this.setState({password})}
                />
              </View>
              {loginButtons}
              {spinner}
              {errorBox}
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={this._onBack}>
                <Image source={require('image!white')} style={styles.backButton}>
                  <Text style={styles.backButtonText}>Back</Text>
                </Image>
              </TouchableOpacity>
            </View>
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
          this.props.navigator.push({
            id: 'Main',
          });
        } else {
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
          this.props.navigator.push({
            id: 'Main',
          });
        } else {
          this.setState({errors: responseData.errors, spinner: false});
        }
      })
      .done();
  },

  _onBack: function() {
    this.props.navigator.push({
      id: 'Main',
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    marginTop: 100,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    height: 100,
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
  backButton: {
    width: 200,
    height: 50,
    tintColor: '#3b5998',
    marginBottom: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white'
  }
});

module.exports = DiscreteLoginView;
