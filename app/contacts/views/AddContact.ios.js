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
  NavigatorIOS,
  PickerIOS,
} = React;

var Button = require('../../global/components/Button.ios.js');
var Modal = require('react-native-modalbox');
var InputRow = require('../components/InputRow.ios.js');
var DaysInputRow = require('../components/DaysInputRow.ios.js');
var DaysPicker = require('../components/DaysPicker.ios.js');
var api = require('../../global/api.js');
var util = require('../../global/util.js');


var AddContact = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      phone: '',
      email: '',
      event: '',
      days: 30,
      errors: null,
      spinner: false,
      modal: false,
    };
  },

  componentDidMount: function() {
    if (this.props.contactData) {
      this.setState({
        name: this.props.contactData.givenName + ' ' + this.props.contactData.familyName,
        phone: this.props.contactData.phoneNumbers.length ? this.props.contactData.phoneNumbers[0].number : '',
        email: this.props.contactData.emailAddresses.length ? this.props.contactData.emailAddresses[0].email : '',
      });
    }
  },

  render: function() {
    var pick = this.state.modal ? <PickerIOS /> : null;
    var spinner = null;
    var errors = null;
    var saveButton = null;
    var input = null;

    if (this.state.spinner) {
      spinner =
        <ActivityIndicatorIOS
          animating={true}
          size="large"
          style={styles.loading}
        />;
    } else if (this.state.errors) {
      errors =
        <Text style={styles.errors}>
          {this.state.errors}
        </Text>;
    }

    if (!this.state.spinner) {
      saveButton =
        <Button
          buttonText='Save Favorite'
          onPress={this._onSave}
          dark={true}
        />;
    }

    return (
      <View style={styles.container}>
        <InputRow
          icon='fontawesome|user'
          placeholder='Name'
          value={this.state.name}
          onValueChange={(name) => this.setState({name})}
        />
        <InputRow
          icon='fontawesome|phone'
          placeholder='Phone'
          value={this.state.phone}
          onValueChange={(phone) => this.setState({phone})}
        />
        <InputRow
          icon='fontawesome|envelope-o'
          placeholder='Email'
          value={this.state.email}
          onValueChange={(email) => this.setState({email})}
        />
        <DaysInputRow
          days={this.state.days}
          onPress={() => this.setState({modal: true})}
        />
        <View style={styles.gap} />
          {errors}
        <View style={styles.gap} />
          {spinner}
          {saveButton}
        <DaysPicker
          days={this.state.days}
          isOpen={this.state.modal}
          onClose={() => this.setState({modal: false})}
          onChange={(days) => this.setState({days})}
        />
      </View>
    );
  },

  _onSave: function() {
    this.setState({spinner: true});
    api.post('contacts/create/', {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        reminder: this.state.days,
      })
      .then((responseData) => {
        if (responseData.success) {
          this.props.navigator.pop();
          this.props.switchTab();
        }
        else {
          this.setState({spinner: false});
          this.setState({errors: 'Errors'});
        }
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  gap: {
    marginTop: 50,
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
    alignSelf: 'center',
    backgroundColor: 'rgba(256,0,0,0.5)',
    padding: 10,
    color:'rgba(256,256,256,0.9)',
    width: 300,
    height: 40,
    borderRadius: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loading: {
    alignSelf: 'center',
  }
});

module.exports = AddContact;
