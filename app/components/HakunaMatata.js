import React, { Component } from 'react';
import { Button, Image, StyleSheet, TouchableHighlight } from 'react-native';

class HakunaMatata extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    Alert.alert('You tapped the button!');
  }

  render() {
    let pic = {
      uri: 'https://i.ebayimg.com/images/g/dVUAAOSwuxFY0DEo/s-l300.jpg'
    };
    return (
      <TouchableHighlight onPress={() => this.onPress}>
        <Image source={pic} style={{width: 300, height: 300}} />
      </TouchableHighlight>
    );
  }
}

export default HakunaMatata;
