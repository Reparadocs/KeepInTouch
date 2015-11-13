'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TextInput,
} = React;

var { Icon, } = require('react-native-icons');

var InputRow = React.createClass({
  getInitialState: function() {
    return {
      focus: false,
    };
  },

  render: function() {
    var inputContainerStyle =
      this.state.focus ? styles.selectedInputContainer : styles.inputContainer;

    return (
      <View style={styles.row}>
        <Icon
          name={this.props.icon}
          size={25}
          color='black'
          style={styles.icon}
        />
        <View style={styles.gap} />
        <View style={inputContainerStyle}>
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
  input: {
    height: 35,
    fontSize: 15,
    padding: 4,
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

module.exports = InputRow;
