import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import Modal from "react-native-modal";
import Icon from '../icons';
import { Input } from 'react-native-elements';

export default class DisplayModal extends Component {

constructor(props){
    super(props);
    this.state = {
        input: '',
        text: ''
    };
}

// WHEN LONG PRESS LISTS ITEM - SHOW THIS MODAL - DELETE MODAL
  renderDeleteModal = () => (
    <View style={styles.modalContent}>
    <View style={{ position: 'absolute', top: 10 ,right: 10, padding: 0, marginTop:0 }}>
        <TouchableOpacity onPress={ () => this.props.function()} >
            <Icon.Foundation color='#666666' name="x" size={30} />
        </TouchableOpacity>
    </View>
    <Text style={styles.text}>Delete List</Text>
    <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 22 }}>{this.props.listName}</Text>
    </View>
    <View style={{ marginTop: 25 ,width: "60%"}}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => this.props.deleteFunction()}>
            <Text style={{  fontSize: 18, color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
    </View>
</View>
  );

  // WHEN PRESS ADD BUTTON ON LISTS - SHOW THIS MODAL - ADD MODAL
  renderModalContent = () => (
    <View style={styles.modalContent}>
        <View style={{ position: 'absolute', top: 10 ,right: 10, padding: 0, marginTop:0 }}>
            <TouchableOpacity onPress={ () => this.props.function()} >
                <Icon.Foundation color='#666666' name="x" size={30} />
            </TouchableOpacity>
        </View>
        <Text style={styles.text}>New List</Text>
        <Input
            containerStyle={{ marginTop: 12 }}
            placeholder='Type here'
            inputContainerStyle={{ borderBottomWidth: 2, borderRadius: 10 }}
            onChangeText={(text) => this.setState({text})}
            leftIcon={
            <Icon.MaterialCommunityIcons
                name='pencil'
                size={24}
                color='black'
            />
            }
        />
        <View style={{ marginTop: 25 ,width: "60%"}}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.input(this.state.text)}>
                <Text style={{  fontSize: 18, color: '#fff' }}>Add</Text>
            </TouchableOpacity>
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
            {this.props.whichModal ? this.renderModalContent() : this.renderDeleteModal()}
          </Modal>
    )}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      backgroundColor: "#1b9af7",
      marginLeft: 10,
      marginRight: 10,
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
      backgroundColor: "white",
      margin: 0,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 0,
      paddingBottom: 25,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      borderColor: "rgba(0, 0, 0, 0.1)"
    },
    text: {
      fontSize: 35,
      marginTop: 20
    }
  
  });