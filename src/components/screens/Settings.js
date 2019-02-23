import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class Settings extends Component {
    render() {
      return (
        <View style={{ flex:1, alignItems:'center', justifyContent: 'center' }}>
        <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          <Text>Settings</Text>
        </View>
      );
    }
  }

export default Settings;