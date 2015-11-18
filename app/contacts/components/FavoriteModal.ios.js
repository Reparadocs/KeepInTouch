'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} = React;

var Modal = require('react-native-modalbox');
var util = require('../../global/util.js');

var FavoriteModal = React.createClass({
  render: function() {
    return (
      <Modal
        style={styles.modal}
        position={"center"}
        isOpen={this.props.isOpen}>
        <Text style={styles.normal}>
          {this.props.name}
        </Text>
        <TouchableOpacity onPress={this.props.onDelete}>
          <Text style={styles.remove}>
            Remove from Favorites
          </Text>
        </TouchableOpacity>
        <View style={styles.row} />
        <TouchableOpacity onPress={this.props.onEdit}>
          <Text style={styles.link}>
            Edit Favorite
          </Text>
        </TouchableOpacity>
        <View style={styles.row} />
        <TouchableOpacity onPress={this.props.onClose}>
          <Text style={styles.link}>
            Cancel
          </Text>
        </TouchableOpacity>

      </Modal>
    );
  }
});

var styles = StyleSheet.create({
  modal: {
    height: 200,
    width: 300,
    justifyContent: 'center',
  },
  normal: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 10,
  },
  link: {
    color: '007AFF',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  remove: {
    color: 'FF3B30',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    transform: [{scaleX: 0.9}],
    borderBottomWidth: 1,
    borderColor: 'grey',
    opacity: 0.5,
  },
});

module.exports = FavoriteModal;
