import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, } from 'react-native';

class WelcomeScreen extends Component {

  componentDidMount(){
    setTimeout(() => {this.props.navigation.navigate('Dashboard')}, 800);
  }

    render() {
      return (
        <View style={{ flex:1, alignItems:'center', justifyContent: 'center', }}>
          <View style={{ flex:4, justifyContent:'center' }}>
            <Text style={{ fontFamily: "ClickerScript-Regular", color:'#262626', fontSize:120 }}>M</Text>
          </View>
          <View style={{ flex:1 }}>
            <Text style={{ fontFamily:'sans-serif-medium', color:'#b3b3b3', fontSize:40, fontWeight:'bold' }}>Trihay</Text>
          </View>
        </View>
      );
    }
  }

  export default WelcomeScreen;