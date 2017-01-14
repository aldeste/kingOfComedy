import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import TimeAgo from 'react-native-timeago';

class LabelMarker extends Component {
  render() {
    const {label, time} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={styles.label}>{label}</Text>
          <TimeAgo style={styles.time} time={this.props.time} />
        </View>
        <View style={styles.arrow} />
      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#D51866',
    padding: 5,
    borderRadius: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  time: {
    color: '#FFF',
    fontSize: 10
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#D51866',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default LabelMarker;
