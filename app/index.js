import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import HakunaMatata from './components/HakunaMatata';

class Welcome extends Component {
  render() {
    let pic = {
      uri: 'https://i.ebayimg.com/images/g/dVUAAOSwuxFY0DEo/s-l300.jpg'
    };
    return (
      <View style={styles.container}>
        <Text>Hakuna Matata!!</Text>
        <HakunaMatata />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
