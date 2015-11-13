'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} = React;

var { Icon, } = require('react-native-icons');

var DaysInputRow = React.createClass({
  render: function() {
    return (
      <View style={styles.row}>
        <Icon
          name='fontawesome|bell'
          size={25}
          color='black'
          style={styles.icon}
        />
        <View style={styles.gap} />
        <Text style={styles.reminderText}>
          Remind me every
        </Text>
        <TouchableOpacity
          style={styles.timeInputContainer}
          onPress={this.props.onPress}>
          <Text style={styles.reminderText}>
            {this.props.days} days
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
  },
  timeInputContainer: {
    flex: 0.25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.3)',
  },
  reminderText: {
    flex: 0.25,
    height: 35,
    fontSize: 16,
    marginTop: 4,
    padding: 4,
  },
});

module.exports = DaysInputRow;
