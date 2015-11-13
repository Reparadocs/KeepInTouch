'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  PickerIOS,
} = React;

var Modal = require('react-native-modalbox');
var util = require('../../global/util.js');

var DaysPicker = React.createClass({
  render: function() {
    return (
      <Modal
        style={styles.modal}
        position={"bottom"}
        isOpen={this.props.isOpen}
        swipeToClose={false}>
        <TouchableOpacity onPress={this.props.onClose}>
          <Text style={styles.done}>
            Done
          </Text>
        </TouchableOpacity>
        <View style={styles.pickerContainer}>
          <PickerIOS
            style={styles.picker}
            selectedValue={this.props.days}
            onValueChange={this.props.onChange}>
              {util.range(1, 100).map((num) => (
                <PickerIOS.Item
                  key={num}
                  value={num}
                  label={num.toString()}
                />
              ))}
          </PickerIOS>
          <Text style={styles.days}>
            days
          </Text>
        </View>
      </Modal>
    );
  }
});

var styles = StyleSheet.create({
  modal: {
    height: 350,
  },
  done: {
    color: '007AFF',
    alignSelf: 'flex-end',
    fontSize: 18,
    marginTop: 5,
    marginRight: 10
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    flex: 0.8,
  },
  days: {
    fontSize: 22,
    flex: 0.2,
    marginTop: 95,
    marginLeft: 20,
  },
});

module.exports = DaysPicker;
