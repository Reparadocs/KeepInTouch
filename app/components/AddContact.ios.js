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
  DatePickerIOS,
  Modal,
} = React;

var api = require('../global/api.js');
var { Icon, } = require('react-native-icons');


var AddContact = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.contactData.givenName + ' ' + this.props.contactData.familyName,
      phone: this.props.contactData.phoneNumbers.length ? this.props.contactData.phoneNumbers[0].number : '',
      email: this.props.contactData.emailAddresses.length ? this.props.contactData.emailAddresses[0].email : '',
      event: '',
      timeNumber: 30,
      timeUnit: 'days',
      errors: null,
      spinner: false,
      modal: false,
    };
  },

  render: function() {
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
        <View style={styles.row}>
          <Icon
            name='fontawesome|bell'
            size={25}
            color='black'
            style={styles.icon}
          />
          <View style={styles.gap} />
          <Text style={styles.reminderText}>Remind me every</Text>
          <View style={styles.timeInputContainer}>
          <Text style={styles.reminderText}>{this.state.timeNumber} {this.state.timeUnit}</Text>
          </View>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.modal}>
          <DatePickerIOS
            mode="time"
            date={this.state.date}
            onDateChange={(date) => this.setState({date})}
          />
        </Modal>

        </View>
        </View>
    );
  }
});

var InputRow = React.createClass({
  getInitialState: function() {
    return {
      focus: '',
    };
  },

  render: function() {
    return (
      <View style={styles.row}>
      <Icon
        name={this.props.icon}
        size={25}
        color='black'
        style={styles.icon}
      />
      <View style={styles.gap} />
      <View style={this.state.focus ? styles.selectedInputContainer : styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          onChangeText={(value) => this.props.onValueChange(value)}
          value={this.props.value}
          onFocus={() => this.setState({focus: true})}
          onBlur={() => this.setState({focus: false})}
        />
      </View>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    height: 100,
  },
  reminderText: {
    flex: 0.25,
    height: 35,
    fontSize: 16,
    marginTop: 4,
    padding: 4,
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
    height: 35,
    fontSize: 15,
    padding: 4,
  },
  timeInputContainer: {
    flex: 0.25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.3)',
  },
  inputContainer: {
    flex: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.3)',
  },
  selectedInputContainer: {
    flex: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '007AFF',
  },
  gap: {
    flex: 0.05,
  },
  icon: {
    marginTop: 5,
    flex: 0.1,
    height: 25,
    width: 25,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  }

});

module.exports = AddContact;
