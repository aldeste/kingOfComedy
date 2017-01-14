import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import MapView from 'react-native-maps';

import LabelMarker from './LabelMarker';
import userMarker from '../../icons/location.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.030;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={
            {
              ...this.props.location,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
          }
        >
          <MapView.Marker
            coordinate={this.props.userLocation}
            titile="Your Location"
            key="User"
            image={userMarker}
          />
          {this.props.locations
            .filter(value => {
              if(!this.props.filter) {
                return value;
              }
              return this.props.filter.includes(value.name);
            })
            .map(location =>
            <MapView.Marker
              coordinate={{latitude, longitude} = location}
              key={location._id}
            >
              <LabelMarker
                label={location.name}
                time={location.when}
              />
            </MapView.Marker>
          )}
        </MapView>
      </View>
    );
  }
}

MapStyle.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: height - 80,
  },
});

module.exports = MapStyle;
