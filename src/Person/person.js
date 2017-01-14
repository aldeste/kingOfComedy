/* @flow */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import TimeAgo from 'react-native-timeago';


const {width} = Dimensions.get('window');

class Person extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text>{this.props.name}</Text>
          <Text>{this.props.where}</Text>
        </View>
        <TimeAgo style={styles.timeSince} time={this.props.when} />
        {this.props.media &&
          <Image
            name="browse"
            source={this.props.media}
            style={
              {
                width: width - 25 * 2,
                height: 209,
                marginTop: 6,
              }
            }/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 25,
  },

  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeSince: {
    fontSize: 12,
    color: '#595A5E'
  }
});

export default Person;
