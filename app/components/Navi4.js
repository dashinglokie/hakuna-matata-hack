import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Platform,PermissionsAndroid} from "react-native";
import MapView, {Marker,AnimatedRegion,Polyline,PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import haversine from "haversine";

const LATITUDE1 = 12.949313;
const LONGITUDE1 = 80.209327;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 12.931224;
const LONGITUDE = 80.231765;

class Navi4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      altCoordinate: new AnimatedRegion({
        latitude: LATITUDE1,
        longitude: LONGITUDE1,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
  }

  componentDidMount() {
    const { coordinate } = this.state;
    Location.requestPermissionsAsync();
    Location.getProviderStatusAsync();
    const newCoordinate = {
      latitude: LATITUDE  + ((Math.random() - 0.5) * (LATITUDE_DELTA / 2)),
      longitude: LONGITUDE  + ((Math.random() - 0.5) * (LONGITUDE_DELTA / 2))
    };
    coordinate.timing(newCoordinate).start();
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        //this command will move the MARKER to the new location when the user double clicks on one of the locations in the drop down
        coordinate.timing(newCoordinate).start();
        // const newCoordinate = {
        //   latitude,
        //   longitude
        // };

        // if (Platform.OS === "android") {
        //   if (this.marker) {
        //     this.marker._component.animateMarkerToCoordinate(
        //       newCoordinate,
        //       500
        //     );
        //   }
        // } else {
        //   coordinate.timing(newCoordinate).start();
        // }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.altCoordinate}
          />
          <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default Navi4;
