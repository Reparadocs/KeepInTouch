'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  ActivityIndicatorIOS,
  NavigatorIOS,
  ListView,
  TouchableOpacity,
  ScrollView,
} = React;

var TimerMixin = require('react-timer-mixin');
var AddContact = require('./AddContact.ios.js');
var api = require('../../global/api.js');
var FavoriteModal = require('../components/FavoriteModal.ios.js');
var Subscribable = require('Subscribable');

var Favorites = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          component: FavoritesList,
          title: 'Favorites',
          passProps: {
            events: this.props.events,
            onAdd: this.props.onAdd,
          },
          rightButtonTitle: 'Add',
          onRightButtonPress: () => this.refs.nav.push({
            component: AddContact,
            title: 'Add Favorite',
            passProps: {
              onAdd: this.props.onAdd,
            },
          }),
        }}
      />
    );
  }
});

var FavoritesList = React.createClass({
  mixins: [Subscribable.Mixin, TimerMixin],

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      modal: false,
      selected: {},
      favorites: [],
      scrollable: true,
      rowWidth: 0,
    };
  },

  componentDidMount: function() {
    this.lastInterval = 0;
    this._refresh();
    this.addListenerOn(this.props.events, 'addEvent', this._refresh);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._rowContent}
        />
        <FavoriteModal
          isOpen={this.state.modal}
          name={this.state.selected.name}
          onClose={() => this.setState({modal: false})}
          onEdit={this._onEdit}
          onDelete={this._onDelete}
        />
      </View>
    );
  },

  _rowContent: function(rowData) {
    var firstName = rowData.name.split(' ')[0];
    var lastName = '';
    if (rowData.name.indexOf(' ') != -1) {
      lastName = rowData.name.substring(rowData.name.indexOf(' ')+1);
    }
    var rowStyle = {flex: 1, flexDirection: 'row', backgroundColor: 'green'};
    if (this.state.rowWidth) {
      rowStyle.width = this.state.rowWidth;
    }
    return (
      <View onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        this.setState({rowWidth: width});
      }}
      style={{flex: 1}}>
        <ScrollView
          horizontal={true}
          onScroll={(e) => this._onSwipe(e, rowData)}
          scrollEventThrottle={5}
          scrollable={this.state.scrollable}
          bounces={this.state.scrollable}
          style={{backgroundColor: 'red'}}>
          <View style={rowStyle}>
          <View style={{flex: 0.8}}>
          <TouchableOpacity onLongPress={() => this._rowLongPress(rowData)}>
            <View style={styles.listContainer}>
              <Text style={styles.rowText}>
                {firstName}
                <Text style={styles.boldText}>
                  {" "}{lastName}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          </View>
          <Text style={{flex: 0.2}}>{rowData.interval} days</Text>
          </View>
        </ScrollView>
        <View style={styles.row} />
      </View>
    );
  },

  _rowLongPress: function(rowData) {
    this.setState({
      modal: true,
      selected: rowData,
    });
  },

  _onEdit: function() {
    this.setState({modal: false});
    this.props.navigator.push({
      component: AddContact,
      title: 'Edit Favorite',
      passProps: {
        contactData: this.state.selected,
        onAdd: this.props.onAdd,
        edit: true,
        refresh: this._refresh,
      },
    });
  },

  _onDelete: function() {
    api.get('contacts/delete/' + this.state.selected.id + '/')
      .then((responseData) => {
        if (responseData.success) {
          this._refresh();
        } else {
          //errors
        }
      })
      .done();
    this.setState({modal: false});
  },

  _onSwipe: function(e, favorite) {
    if (e.nativeEvent.contentOffset.x > this.lastInterval) {
      if (e.nativeEvent.contentOffset.x < -50 && this.state.scrollable) {
        var newFavorites = this.state.favorites.slice();
        for (var i = 0; i < this.state.favorites.length; i++) {
          if (this.state.favorites[i].name === favorite.name) {
            newFavorites.splice(i, 1);
            newFavorites.push(favorite);
            this.setState({
              scrollable: false,
              dataSource: this.state.dataSource.cloneWithRows(newFavorites),
              favorites: newFavorites,
            });
            break;
          }
        }
        this.setTimeout(() => {this.setState({scrollable: true});}, 500);
      }
    }
    this.lastInterval = e.nativeEvent.contentOffset.x;
  },

  _refresh: function() {
    api.get('contacts/list/')
      .then((responseData) => {
        if (!responseData.status) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            favorites: responseData,
          });
        }
        else {
          console.log(responseData.status);
          //errors
        }
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  row: {
    transform: [{scaleX: 0.95}],
    borderBottomWidth: 1,
    borderColor: 'grey',
    opacity: 0.3,
    padding: 4,
  },
  rowText: {
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 15,
    fontFamily: 'Helvetica',
    fontSize: 18,
    flex: 0.75,
  },
  rowAdd: {
    color: '007AFF',
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 15,
    fontFamily: 'Helvetica',
    fontSize: 18,
    flex: 0.1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
  }
});

module.exports = Favorites;
