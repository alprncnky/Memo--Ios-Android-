import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, StatusBar, TouchableHighlight} from 'react-native';
import { setNotificationData, getNotificationData } from '../Data';
import { HandleNotification } from '../PushController';
import { Slider } from 'react-native-elements';
import Switch from 'react-native-switch-pro';
import { Divider } from 'react-native-elements';

class Settings extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: 30,
      onOff: null
    }
  }

  async componentDidMount(){
    info = await getNotificationData()
    if(info == 0){
      this.setState({
        onOff: false
       })
    }
    else {
      this.setState({
        onOff: true,
        value: info
       })
    }
  }

  setTime(swtch){
    this.setState({ onOff: swtch })
    console.log("state.onOff"+this.state.onOff)
    console.log("swtch"+swtch)
    //alert(this.state.value+String(swtch))
    if(swtch){
      this.bildirimAyarla(this.state.value)
    }
    else{
      this.bildirimAyarla(0)
    }
  }

  bildirimAyarla(number){
    setNotificationData(number)
    HandleNotification()
  }

    render() {
      return (
        <View style={{ flex:1 }}>
        <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />

          <View style={{ margin:20 }}>
              <View style={{ flexDirection:'row' }}>
                <View style={{ flex:6 }}>
                  <Text style={{ fontSize: 26, fontWeight:'bold' }}>Notifications</Text>
                </View>
                <View style={{ flex: 2, justifyContent:'center', alignItems:'center' }}>
                  <Switch
                    backgroundActive='#4d94ff'
                    value={this.state.onOff}
                    onSyncPress={(value) => this.setTime(value)}
                  />
                </View>
              </View>

              <Divider style={{ height: 1 ,backgroundColor: '#cccccc', marginRight:10 }} />

              <View style={{ marginTop:10 }}>
                <Text style={{ fontSize: 16, fontWeight:'bold' }}>Notification per minute:</Text>
              </View>

              <View style={{ flexDirection:'row' }}>
                <View style={{ flex:6, alignItems: 'stretch', justifyContent: 'center' }}>
                  <Slider
                    disabled={false}
                    maximumValue={180}
                    minimumValue={30}
                    step={30}
                    onSlidingComplete={() => this.setTime(this.state.onOff)}
                    thumbTintColor='#4d94ff'
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                  />
                </View>
                <View style={{ flex: 2, borderColor:'#cccccc', borderRadius:20, borderWidth: 1, justifyContent:'center', alignItems:'center' }}>
                  <Text style={{ fontSize:28, fontWeight:'bold' }}>{this.state.value}</Text>
                </View>
              </View>
            </View>

            <Divider style={{ height: 1 ,backgroundColor: '#cccccc', marginHorizontal:10 }} />
          

        </View>
      );
    }
  }

export default Settings;