'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  ActivityIndicatorIOS,
} = React;

var LoadingView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={require('image!intro')} style={styles.image}>
          <ActivityIndicatorIOS animating={true} size="large" />
        </Image>
      </View>
    );
  },
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
    alignItems: 'center',
    justifyContent: 'center',
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

module.exports = LoadingView;
