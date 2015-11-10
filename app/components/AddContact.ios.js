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

var Modal = require('react-native-modalbox')
var api = require('../global/api.js');
var util = require('../global/util.js');
var { Icon, } = require('react-native-icons');


var AddContact = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.contactData.givenName + ' ' + this.props.contactData.familyName,
      phone: this.props.contactData.phoneNumbers.length ? this.props.contactData.phoneNumbers[0].number : '',
      email: this.props.contactData.emailAddresses.length ? this.props.contactData.emailAddresses[0].email : '',
      event: '',
      timeNumber: 30,
      errors: null,
      spinner: false,
      modal: false,
    };
  },

  render: function() {
        var pick = this.state.modal ? <PickerIOS /> : null;
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
          <TouchableOpacity style={styles.timeInputContainer} onPress={() => this.setState({modal: true})}>
          <Text style={styles.reminderText}>{this.state.timeNumber} days</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 100}}/>
        <TouchableOpacity onPress={this._onSave}>
          <Image source={require('image!white')} style={styles.button}>
            <Text style={styles.buttonText}>Save Favorite</Text>
          </Image>
        </TouchableOpacity>
        <Modal style={{height: 350}} position={"bottom"} isOpen={this.state.modal} swipeToClose={false}>
        <TouchableOpacity onPress={() => this.setState({modal: false})}>
        <Text style={{color: '007AFF', alignSelf: 'flex-end', fontSize: 18, marginTop: 5, marginRight: 10}}>Done</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
             <PickerIOS
             style={{flex: 0.8}}
               selectedValue={this.state.timeNumber}
               onValueChange={(timeNumber) => this.setState({timeNumber})}>
               {util.range(1, 100).map((num) => (
                 <PickerIOS.Item
                   key={num}
                   value={num}
                   label={num.toString()}
                 />
               ))}
             </PickerIOS>
             <Text style={{fontSize: 22, flex: 0.2, marginTop: 95, marginLeft: 20}}>days</Text>
            </View>
        </Modal>

        </View>
    );
  },

  _onSave: async function() {
    this.setState({spinner: true});
    await api.post('contacts/create', {access_token: access_token.tokenString})
      .then((responseData) => {
        this._setToken(responseData.token).done();
      });
    this.props.switchTab();
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
  button: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    tintColor: 'rgba(128, 128, 128, 0.1)',
  },
  buttonText: {
    color: '#007AFF',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
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
