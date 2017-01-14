/* @flow */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  Dimensions
} from 'react-native';

import Person from '../Person/person';

const {height} = Dimensions.get('window');

class Browse extends Component {
  render() {
    return (
      <ScrollView style={{height: height - 46 - 80}}>
        {this.props.celebs
          // sort by newest first
          .sort((a, b) => new Date(b.when) - new Date(a.when))
          // if filter is active, filter list
          .filter(value => {
            if(!this.props.filter) {
                return value;
            }
            return this.props.filter.includes(value.name);
          })
          // search always possible
          .filter(value => value.name
            .toLowerCase()
            .includes(this.props.search.toLowerCase())
          )
          .map(e =>
            <TouchableHighlight
              key={e._id}
              onPress={() => this.props.callback(e)}>
              <View>
                <Person
                  name={e.name}
                  where={e.where}
                  when={e.when}
                  media={e.picture}
                />
              </View>
            </TouchableHighlight>
          )}
      </ScrollView>
    );
  }
}

export default Browse
