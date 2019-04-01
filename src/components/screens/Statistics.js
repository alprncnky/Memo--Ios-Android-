import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { get } from '../Data';
import { NavigationEvents } from "react-navigation";
import PieChart from 'react-native-pie-chart';
import StatCard from '../ui-items/statCard';
import { ScrollView } from 'react-native-gesture-handler';

export default class Statistics extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      parsed: [],
      DataNames: [],
      DataNumbers: [],
      DataColors: [],
      DataNotify: [],
      DataShow: [],
      DataCorrect: []
    }
  }

  componentDidMount(){
    this.loadData();
  }

   // refresh Flatlist  ( get data from local saved )
  async loadData() {
    this.setState({
      parsed: await get()
    })
    this.setChart();
  }

  // set chart data
  setChart(){
    let dataNames = [];
    let dataColors = [];
    let dataNumbers = [];
    let dataNotify = [];
    let dataShow = [];
    let dataCorrect = [];
    let colorid=0
    colors = ['#FF9800','#2196F3','#F44336','#673AB7','#009688','#3F51B5','#4CAF50','#E64A19','#607D8B','#C2185B']
    this.state.parsed.list.forEach(element => {
      if(element.liste.length>0){
        let tempNotify=0;
        let tempShow=0
        dataNames.push(element.name)
        dataNumbers.push(element.liste.length)
        dataColors.push(colors[colorid])
        for(i=0; i<element.liste.length; i++){
          tempShow = element.liste[i].showed + tempShow
        }
        dataShow.push(tempShow)

        if(element.notification){
          dataNotify.push(element.notification)
        }
        else{
          dataNotify.push(0)
        }

        if(element.correct){
          dataCorrect.push(element.correct)
        }
        else{
          dataCorrect.push(0)
        }
        colorid += 1
        colorid = colorid % 10
      }
    });
    this.setState({
      DataNames: dataNames,
      DataNumbers: dataNumbers,
      DataColors: dataColors,
      DataNotify: dataNotify,
      DataShow: dataShow,
      DataCorrect: dataCorrect
    })
  }

  _renderCards(){
      if(this.state.DataNames.length>0){
          let cards = [] 
          for(i=0; i<this.state.DataNames.length; i++){
            txt1=this.state.DataNotify[i]
            txt2=this.state.DataCorrect[i]+"/"+this.state.DataShow[i]
            cards.push(
                <View style={{flexDirection:'row'}}>
                    <StatCard sayi={this.state.DataNumbers[i]} listName={this.state.DataNames[i]} color={this.state.DataColors[i]} text1={txt1} text2={txt2} />
                </View>
            );
          }
          return cards
        }
      else{
          return(
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:22}}>Can't find info.</Text>
              <Text style={{fontSize:22}}>Try to add list and words.</Text>
            </View>
          )
      }
  }

  render() {
    return (
      <View style={{ flex:1, justifyContent:'center' }}>
        <NavigationEvents
          onWillFocus={() => {
              //Trigger when this navigation screen on focus
              this.loadData()
          }}
        />
        <ScrollView>
            <View style={{flex:2, alignItems:'center'}}>
                <Text style={{ margin:10, fontSize: 30 }}>Statistics</Text>
                <PieChart
                    chart_wh={200}
                    series={this.state.DataNumbers}
                    sliceColor={this.state.DataColors}
                  />
            </View>
            <View style={{flex:2, marginTop:20, alignItems:'center'}}>
              {this._renderCards()}
            </View>
        </ScrollView>
      </View>
    );
  }
}
