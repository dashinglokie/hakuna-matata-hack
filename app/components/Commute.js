import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

class Commute extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://navigation-prioritizer.herokuapp.com/api/signal')
    // return fetch('https://facebook.github.io/react-native/movies.json')
    // return fetch('https://jsonplaceholder.typicode.com/todos/5')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.types,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:200, paddingLeft:50}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

export default Commute;
