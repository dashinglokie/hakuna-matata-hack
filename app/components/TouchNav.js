import React from 'react';
import {Button, View, Text, Image} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HakunaMatata from "./HakunaMatata";
import Navi4 from "./Navi4";

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{uri: 'https://i.ebayimg.com/images/g/dVUAAOSwuxFY0DEo/s-l300.jpg'}} style={{width: 300, height: 300}} />
                <Button
                    title="Go to Map"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Navi4 />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

const AppContainer = createAppContainer(RootStack);

class TouchNav extends React.Component {
    render() {
        return <AppContainer />;
    }
}

export default TouchNav;