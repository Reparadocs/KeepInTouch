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
} = React;

var api = require('../../global/api.js');
var util = require('../../global/util.js');
var AddContact = require('./AddContact.ios.js');
var UserContacts = require('react-native-contacts');

var Contacts = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          component: ContactsList,
          title: 'Contacts',
          passProps: {
            onAdd: this.props.onAdd,
            switchTab: this.props.switchTab,
          },
          rightButtonTitle: 'Add',
          onRightButtonPress: () => this.refs.nav.push({
            component: AddContact,
            title: 'Add Favorite',
            passProps: {
              onAdd: this.props.onAdd,
              switchTab: this.props.switchTab,
            },
          }),
        }}
      />
    );
  }
});

var ContactsList = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      contacts: [],
    };
  },

  componentDidMount: function() {
    UserContacts.getAll((err, contacts) => {
      if (err) {

      } else {
        api.get('contacts/list/')
          .then((responseData) => {
            if (!responseData.status) {
              for (var i  = 0; i < contacts.length; i++) {
                var contactName = util.getContactName(contacts[i]);
                for (var j = 0; j < responseData.length; j++) {
                  if (contactName === responseData[j].name) {
                    contacts.splice(i, 1);
                    i--;
                    break;
                  }
                }
              }
            } else {
              //errors
            }
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(contacts),
              contacts: contacts,
            });
          }).done();
      }
    });
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._rowContent}
      />
    );
  },

  removeContact: function(contactName) {
    var newContacts = this.state.contacts.slice();
    for (var i = 0; i < newContacts.length; i++) {
      if (util.getContactName(newContacts[i]) === contactName) {
        newContacts.splice(i, 1);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newContacts),
          contacts: newContacts,
        });
        break;
      }
    }
  },

  _rowContent: function(rowData) {
    return (
      <View>
        <TouchableOpacity onPress={() => this._rowPress(rowData)}>
          <View style={styles.listContainer}>
            <Text style={styles.rowText}>
              {rowData.givenName}
              <Text style={styles.boldText}>
                {" "}{rowData.familyName}
              </Text>
            </Text>
            <Text style={styles.rowAdd}>
              +
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.row} />
      </View>
    );
  },

  _rowPress: function(rowData) {
    this.props.navigator.push({
      component: AddContact,
      title: 'Add Favorite',
      passProps: {
        onAdd: this.props.onAdd,
        contactData: rowData,
        switchTab: this.props.switchTab,
        removeContact: this.removeContact,
      },
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});

module.exports = Contacts;
