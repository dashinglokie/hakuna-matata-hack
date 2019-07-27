import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as geolib from 'geolib';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Navi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
   this.setState({
     markers: [
       ...this.state.markers,
       {
         coordinate: e.nativeEvent.coordinate,
         cost: `$${getRandomInt(50, 300)}`
       }
     ]
   })
 }
 render() {
   const center = geolib.getCenter([
                                      { latitude: 12.931234, longitude: 80.231849 },
                                      { latitude: 12.931106, longitude: 80.231495 },
                                      { latitude: 12.931561, longitude: 80.231685 },
                                  ]);
    return (
      <MapView
        style={styles.container}
        initialRegion={{
            // latitude: 13.0827,
            latitude: center.latitude,
            // longitude: 80.2707,
            longitude: center.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={this.handlePress}
      >
      {this.state.markers.map((marker) => {
        return (
          // <Marker {...marker} >
          //   <View style={styles.marker}>
          //     <Text style={styles.text}>{marker.cost}</Text>
          //   </View>
          // </Marker>
          <Marker
            coordinate={center.latitude, center.longitude}
            image={require('../resources/ambulance.png')}
          />
        )
      })}
      </MapView>
    );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
});

export default Navi;
