import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerItems} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

const CustomDrawerContent = (props) => (
    <SafeAreaView style={{ flex:1 }}>
      <View style={{ height: 150, backgroundColor:'#cccccc' }} >
  
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
)

export default CustomDrawerContent;