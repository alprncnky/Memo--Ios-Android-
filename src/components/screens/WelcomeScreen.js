import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, } from 'react-native';

class WelcomeScreen extends Component {

  componentDidMount(){
    setTimeout(() => {this.props.navigation.navigate('Dashboard')}, 1000);
  }

    render() {
      return (
        <View style={{ flex:1, alignItems:'center', justifyContent: 'center' }}>
          <Text style={{ color:'#262626' ,fontWeight:'bold', fontSize:80 }}>M</Text>
        </View>
      );
    }
  }

  export default WelcomeScreen;




  /*
  import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, } from 'react-native';

class WelcomeScreen extends Component {
    render() {
      return (
        <View style={{ flex:1, alignItems:'center', justifyContent: 'center' }}>
          <Button title='login' onPress={ ()=> this.props.navigation.navigate('Dashboard') } 
          />
        </View>
      );
    }
  }

  export default WelcomeScreen;
  */