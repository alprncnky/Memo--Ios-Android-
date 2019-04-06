import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const width_R = Math.round(Dimensions.get('window').width/5)
const height_R= Math.round(Dimensions.get('window').height/8.5)
const added = width_R+height_R
const circle = Math.round(added/2)

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Go Sentences screen
   goSentenceScreen(lan){
    this.props.navigation.navigate('Sentences',{data: lan});
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{flex:2, flexDirection:'row'}}>
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{ color:'#1a1a1a', fontSize: 65, fontWeight:'bold' }}>Quotes</Text>
                  <Text style={{ fontStyle:'italic', fontSize: 20 }}>Learn With Sentences</Text>
              </View>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
              <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.goSentenceScreen("en")} style={styles.rounded}>
                      <Image style={{flex:1 ,resizeMode: 'contain' }}
                        source={require('../../../images/en512.png')}
                      />
                  </TouchableOpacity>
                  <Text>English</Text>
              </View>
              <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.goSentenceScreen("fr")} style={styles.rounded}>
                      <Image style={{flex:1 ,resizeMode: 'contain' }}
                        source={require('../../../images/fr512.png')}
                      />
                  </TouchableOpacity>
                  <Text>French</Text>
              </View>
          </View>
          <View style={{flex:2, flexDirection:'row', justifyContent:'center'}}>
          <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.goSentenceScreen("tr")} style={styles.rounded}>
                      <Image style={{flex:1 ,resizeMode: 'contain' }}
                        source={require('../../../images/tr512.png')}
                      />
                  </TouchableOpacity>
                  <Text>Turkish</Text>
              </View>
              <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.goSentenceScreen("es")} style={styles.rounded}>
                      <Image style={{flex:1 ,resizeMode: 'contain' }}
                        source={require('../../../images/es512.png')}
                      />
                  </TouchableOpacity>
                  <Text>Spanish</Text>
              </View>
          </View>
          <View style={{flex:2, flexDirection:'row'}}>
          <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.goSentenceScreen("pr")} style={styles.rounded}>
                      <Image style={{flex:1 ,resizeMode: 'contain' }}
                        source={require('../../../images/pr512.png')}
                      />
                  </TouchableOpacity>
                  <Text>Portuguese</Text>
              </View>
              <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.goSentenceScreen("it")} style={styles.rounded}>
                      <Image style={{flex:1 ,resizeMode: 'contain' }}
                        source={require('../../../images/it512.png')}
                      />
                  </TouchableOpacity>
                  <Text>Italian</Text>
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  itemContainer:{
    flex:2, 
    justifyContent:'center', 
    alignItems:'center'
  },
  rounded:{
    width: circle,
    height: circle,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    flex: 1
  }

})

export default Quotes;
