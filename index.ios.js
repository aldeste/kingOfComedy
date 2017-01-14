/**
 * @flow
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, StatusBar, Image, TextInput, Navigator, TouchableHighlight} from "react-native";
import Tabs from "react-native-tabs";

import Browse from './src/Browse/Browse';
import Map from './src/Map/Map';

import backToSearch from './icons/search.png';

export default class theKing extends Component {
  state = {
    page: 'browse',
    favorites: ['Carey Cruz', 'Chambers Henderson'],
    stalking: false,
    added: 0,
    data: [
      {
        "_id": "5877d507d1e529c550f87a7d",
        "picture": require("./data/10.jpg"),
        "name": "Casey Klein",
        "when": new Date(new Date() - 14 * 60000),
        "where": "Columbia Place",
        "latitude": "27.716796",
        "longitude": "-119.021768"
      },
      {
        "_id": "5877d5082afbd0f9a9f4434d",
        "picture": require("./data/9.jpg"),
        "name": "Steele Downs",
        "when": new Date(new Date() - 11 * 60000),
        "where": "Clay Street",
        "latitude": "32.5438",
        "longitude": "-162.273099"
      },
      {
        "_id": "5877d508f99bb82859446a90",
        "picture": require("./data/8.jpg"),
        "name": "Serrano Pickett",
        "when": new Date(new Date() - 9 * 60000),
        "where": "Fane Court",
        "latitude": "-33.477066",
        "longitude": "162.959543"
      },
      {
        "_id": "5877d508e692d4ae04fdd363",
        "picture": require("./data/7.jpg"),
        "name": "Fulton Merritt",
        "when": new Date(new Date() - 52 * 60000),
        "where": "Ocean Court",
        "latitude": "-9.548587",
        "longitude": "-91.025201"
      },
      {
        "_id": "5877d50832d383770fc9f964",
        "picture": require("./data/1.jpg"),
        "name": "Chambers Henderson",
        "when": new Date(new Date() - 28 * 60000),
        "where": "Bushwick Place",
        "latitude": "47.255602",
        "longitude": "101.10289"
      },
      {
        "_id": "5877d508738cb87d092392a5",
        "picture": require("./data/2.jpg"),
        "name": "Clayton Jones",
        "when": new Date(new Date() - 27 * 60000),
        "where": "Seeley Street",
        "latitude": "89.459245",
        "longitude": "-113.205105"
      },
      {
        "_id": "5877d50878557b14c23bf5f9",
        "picture": require("./data/3.jpg"),
        "name": "Kris Hansen",
        "when": new Date(new Date() - 29 * 60000),
        "where": "National Drive",
        "latitude": "-56.109691",
        "longitude": "9.292694"
      },
      {
        "_id": "5877d5080407d219e716210a",
        "picture": require("./data/4.jpg"),
        "name": "Erika Trevino",
        "when": new Date(new Date() - 59 * 60000),
        "where": "Broome Street",
        "latitude": "34.170622",
        "longitude": "34.646989"
      },
      {
        "_id": "5877d5083e126b01d452d529",
        "picture": require("./data/5.jpg"),
        "name": "Frye Martinez",
        "when": new Date(new Date() - 46 * 60000),
        "where": "Harbor Court",
        "latitude": "27.280999",
        "longitude": "169.932051"
      },
      {
        "_id": "5877d50818c195ca5971541e",
        "name": "Carey Cruz",
        "when": new Date(new Date() - 49 * 60000),
        "where": "Blake Court",
        "latitude": "-57.513809",
        "longitude": "128.155618"
      },
      {
        "_id": "5877d50818c195ca5971541e2",
        "picture": require("./data/6.jpg"),
        "name": "Carey Cruz",
        "when": new Date(),
        "where": "Blake Court",
        "latitude": "-57.513809",
        "longitude": "128.155618"
      }
    ]
  };

  _setUserPositionState(position) {
    const {latitude, longitude} = position.coords;
    this.setState({
      location: {
        latitude,
        longitude,
      }
    });

    if (!this.state.stalking) {
      this.setState({
        mapRegion: {
          latitude,
          longitude,
        }
      });
    }
  }

  // Used to calculate locations near me, for dummy data
  _getRandomNumber(max, min) {
    return Math.random() * (max - min) + min;
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._setUserPositionState(position);

        // for dummy data
        this.state.data.map(celeb => {
          celeb.latitude = this._getRandomNumber(
            position.coords.latitude + 0.0300,
            position.coords.latitude - 0.0300
          );
          celeb.longitude = this._getRandomNumber(
            position.coords.longitude + 0.0300,
            position.coords.longitude - 0.0300
          );
        });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    navigator.geolocation.watchPosition(
      position => this._setUserPositionState(position)
    );
  }

  render() {
    const browseIcon = this.state.page === "browse"
      ? require("./icons/eye-active.png")
      : require("./icons/eye.png");
    const favIcon = this.state.page === "favorites"
      ? require("./icons/heart-active.png")
      : require("./icons/heart.png");
    const signalIcon = this.state.page === "signal"
      ? require("./icons/megaphone-active.png")
      : require("./icons/megaphone.png");

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#D51866" barStyle="light-content" />
        <Navigator
          initialRoute={{index: 0}}
          renderScene={(route, navigator) => {
            return <View>
              <View style={styles.body}>
                {this.state.page !== 'signal' && !this.state.stalking &&
                  <Browse
                    celebs={this.state.data}
                    search={this.state.text || ''}
                    filter={this.state.page === 'favorites' ? this.state.favorites : ''}
                    callback={callback => {
                      navigator.push({
                        index: route.index + 1,
                      });
                      this.setState({
                        stalking: true,
                        mapRegion: {
                          latitude: callback.latitude,
                          longitude: callback.longitude
                        }
                      })
                    }}
                  />
                }
                {(this.state.page === 'signal' || this.state.stalking) &&
                  <Map
                    location={this.state.mapRegion}
                    userLocation={this.state.location}
                    locations={this.state.data}
                    filter={this.state.page === 'favorites' ? this.state.favorites : ''}
                  />
                }
              </View>
              <View style={styles.header}>
                {(!this.state.stalking && this.state.page !== 'signal') &&
                  <TextInput style={styles.search}
                    onChangeText={text => this.setState({text})}
                    placeholder="Search celebreties"
                    placeholderTextColor="#C7C7CD"
                    value={this.state.text || ''}/>
                }
                {(this.state.stalking && this.state.page !== 'signal') &&
                  <TouchableHighlight
                    onPress={() => {
                      navigator.pop();
                      this.setState({
                        stalking: false
                      })
                    }}
                  >
                    <View style={styles.nav}>
                      <Image name="browse" source={backToSearch} />
                    </View>
                  </TouchableHighlight>
                }
                {(this.state.page === 'signal' && !this.state.signaling) &&
                  <TouchableHighlight
                    onPress={() => this.setState(
                      {
                        signaling: true,
                      }
                    )}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Signal celebrety right here!</Text>
                    </View>
                  </TouchableHighlight>
                }
                {this.state.page === 'signal' &&
                  this.state.signaling &&
                    <View style={styles.nav}>
                      <TouchableHighlight onPress={() =>
                        this.setState({
                          signaling: false,
                        })}>
                        <View style={styles.button}>
                          <Text style={styles.buttonText}>Cancel</Text>
                        </View>
                      </TouchableHighlight>
                      <TextInput style={styles.search}
                        onChangeText={newName => this.setState({newName})}
                        placeholder="Celebrety name"
                        placeholderTextColor="#C7C7CD"/>
                      <TouchableHighlight onPress={() => {
                        if (this.state.newName) {
                          this.setState({
                            signaling: false,
                            data: this.state.data.concat([{
                              "_id": this.state.added++,
                              "name": this.state.newName,
                              "when": new Date(),
                              "where": "Columbia Place",
                              "latitude": this.state.location.latitude,
                              "longitude": this.state.location.longitude
                            }])
                          })
                        }
                      }
                      }>
                        <View style={styles.button}>
                          <Text style={styles.buttonText}>Submit</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                }
              </View>
            </View>}
          }
        />
        <Tabs
          style={styles.footer}
          onSelect={el => {
            const page = el.props.name;
            page !== 'signal' ?
            this.setState({
              page: el.props.name,
            })
            :
            this.setState({
              page: el.props.name,
              mapRegion: {
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
              }
            })
          }}
        >
          <Image name="browse" source={browseIcon} />
          <Image name="favorites" source={favIcon} />
          <Image name="signal" source={signalIcon} />
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    backgroundColor: "#D51866",
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  },
  body: {
    marginTop: 80
  },
  nav: {
    justifyContent: 'center',
    alignItems:'center',
    height: 40,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: '#7d3fa6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 11
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  search: {
    height: 40,
    padding: 11,
    backgroundColor: "rgba(0,0,0,.3)",
    borderRadius: 8,
    color: "#FFF",
    flex: 3
  },
  footer: {
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F2F3F8",
    height: 46,
  }
});

AppRegistry.registerComponent("theKing", () => theKing);
