import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, StatusBar, Dimensions, FlatList} from 'react-native';
import Modal from "react-native-modal";
import Icon from '../icons';
import { ScrollView } from 'react-native-gesture-handler';

const height_ = Math.round(Dimensions.get('window').height)
const modalHeight = Math.round(height_*0.5)
var langArray = ["English","Spanish","Arabic","French","German","Indonesian","Hindi","Italian","Portuguese","Russian","Turkish"];

export default class LangModal extends Component {

constructor(props){
    super(props);
}

  // WHEN PRESS flag button 
  renderModalContent = () => (
    <View style={styles.modalContent}>
        <View style={ styles.modalTitle }>
            <Text style={styles.text}>Select Language</Text>
        </View>
        <View style={{ marginTop:5, alignItems:'center' }}>
            <Icon.Entypo name="chevron-up" size={25} />
        </View>
        <ScrollView>
            <View style={{ flex:1 }}>
                    <FlatList
                        data={langArray}
                        renderItem={({item, index}) => 
                            <TouchableHighlight underlayColor="#e6e6e6" onPress={() => this.props.input(index)}>
                                <Text style={{ alignSelf:'center', fontSize: 28, justifyContent:'center' }}>{item}</Text>
                            </TouchableHighlight>
                        }
                    />
            </View>
        </ScrollView>
        <View style={{ alignItems:'center' }}>
            <Icon.Entypo name="chevron-down" size={25} />
        </View>
    </View>
  );

render(){
    return(
        <Modal
            isVisible={this.props.display === true}
            animationIn='bounceIn'
            onBackdropPress={() => this.props.function()}
            useNativeDriver={ true }
          >
            <View>
                <StatusBar backgroundColor="rgba(0,0,0,0.7)"  barStyle="light-content"/>
            </View>
            {this.renderModalContent()}
          </Modal>
    )}
}


const styles = StyleSheet.create({
    modalContent: {
      height: modalHeight,
      backgroundColor: "white",
      margin: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 0,
      paddingBottom: 25,
      justifyContent: "center",
      borderRadius: 8,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalTitle: {
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 0.2,
          shadowColor: 'black',
    },
    text: {
      alignSelf: 'center',
      color:'#262626',
      fontSize: 30,
      fontWeight: '700',
      marginTop: 20
    }
  });