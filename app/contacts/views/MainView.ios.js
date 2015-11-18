'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TabBarIOS,
} = React;

var Settings = require('./Settings.ios.js');
var Contacts = require('./Contacts.ios.js');
var Favorites = require('./Favorites.ios.js');
var EventEmitter = require('EventEmitter');

var LoginView = React.createClass({
  componentWillMount: function() {
    this.eventEmitter = new EventEmitter();
  },

  getInitialState: function() {
    return {
      selectedTab: 'contacts',
      refresh: false,
    };
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon='contacts'
          selected={this.state.selectedTab === 'contacts'}
          onPress={() => {
            this.setState({
              selectedTab: 'contacts',
            });
          }}>
          <Contacts switchTab={this._switchTab} onAdd={this._onAdd} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon='favorites'
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'favorites',
            });
          }}>
          <Favorites
            events={this.eventEmitter}
            onAdd={this._onAdd}
            refresh={this.state.refresh}
            onRefresh={this._onRefresh}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon='more'
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <Settings onLogout={this.props.onLogout} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

  _switchTab: function() {
    this.setState({
      selectedTab: 'favorites',
    });
  },

  _onRefresh: function() {
    this.setState({refresh: false});
  },

  _onAdd: function() {
    this.eventEmitter.emit('addEvent');
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

module.exports = LoginView;
