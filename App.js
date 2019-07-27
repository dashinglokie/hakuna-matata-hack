import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Welcome from './app/index';
import Navi from './app/components/Navi';
import Navi2 from './app/components/Navi2';
import Navi3 from './app/components/Navi3';
import Navi4 from './app/components/Navi4';
import Navi5 from './app/components/Navi5';
import TouchPanel from './app/components/TouchPanel';
import Commute from './app/components/Commute';
import TouchNav from './app/components/TouchNav';

export default class App extends Component {
  render() {
    return (
      // <Navi />
      // <Navi2 />
      // <Navi3 />
       //<Navi4 />
       // <Navi5 />
      // <TouchPanel />
       <TouchNav />
      // <Commute />
      // <Welcome />
    );
  }
}

AppRegistry.registerComponent('HakunaMatataBeta1', () => HakunaMatata);
