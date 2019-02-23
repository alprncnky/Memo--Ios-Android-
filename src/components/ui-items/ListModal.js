import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import Modal from "react-native-modal";
import Icon from '../icons';
import { Input } from 'react-native-elements';
import { deleteList } from '../Data';

export default class ListModal extends Component {

constructor(props){
    super(props);
    this.state = {
        input: '',
        text1: '',
        text2: ''
    };
}

// when textinput done and hit the enter button on keyboard
EnterKeyPressed = (e) => {
    this.props.input(this.state.text1)
    this.setState({text1: null })
}

// send input and clear textbox input data
sendInput(){
    this.props.input(this.state.text1, this.state.text2)
    this.setState({text1: null, text2: null})
}

  renderChooseModal() {
      if(this.props.whichModal==1){
          // add modal
        return this.renderModalContent()
      }
      else if(this.props.whichModal==2){
          // delete modal
          return this.renderDeleteModal()
      }
      else if(this.props.whichModal==3){
          // edit modal
          return this.renderEditModal()
      }
      else if(this.props.whichModal==4){
          return this.renderTestInput()
      }
  }


// CALL FROM TEST SCREEN - FOR GET INPUT MODAL
renderTestInput = () => (
    <View style={{ backgroundColor: 'blue' }}>
        <View style={{ backgroundColor: 'white', borderColor:'#d9d9d9', borderWidth:2 }}>
            <Input
                placeholder='Type Answer'
                autoFocus={true}
                inputContainerStyle={{ borderBottomWidth: 2, borderRadius: 10 }}
                onChangeText={(text) => this.setState({text1: text})}
                onSubmitEditing={this.EnterKeyPressed.bind(this)}
            />
        </View>
    </View>
);


// EDIT WORD - SHOW THIS MODAL - EDIT MODAL
renderEditModal = () => (
    <View style={styles.modalContent}>
    <View style={{ position: 'absolute', top: 10 ,right: 10, padding: 0, marginTop:0 }}>
        <TouchableOpacity onPress={ () => this.props.function()} >
            <Icon.Foundation color='#666666' name="x" size={30} />
        </TouchableOpacity>
    </View>
    <Text style={styles.text}>Edit Word</Text>
    <Input
        containerStyle={{ marginTop: 12 }}
        placeholder={this.props.word1}
        inputContainerStyle={{ borderBottomWidth: 2, borderRadius: 10 }}
        onChangeText={(text) => this.setState({text1: text})}
        value={this.state.text1}
        leftIcon={
        <Icon.MaterialCommunityIcons
            name='pencil'
            size={24}
            color='black'
        />
        }
    />
    <Input
        containerStyle={{ marginTop: 12 }}
        placeholder={this.props.word2}
        inputContainerStyle={{ borderBottomWidth: 2, borderRadius: 10 }}
        onChangeText={(text) => this.setState({text2: text})}
        value={this.state.text2}
        leftIcon={
        <Icon.MaterialCommunityIcons
            name='pencil'
            size={24}
            color='black'
        />
        }
    />
    <View style={{ marginTop: 25 ,width: "60%"}}>
        <TouchableOpacity style={styles.buttonGreen} onPress={() => this.sendInput()}>
            <Text style={{  fontSize: 18, color: '#fff' }}>Save</Text>
        </TouchableOpacity>
    </View>
</View>
    );


  // LIST ITEMS - SHOW THIS MODAL - DELETE MODAL
  renderDeleteModal = () => (
    <View style={styles.modalContent}>
    <View style={{ position: 'absolute', top: 10 ,right: 10, padding: 0, marginTop:0 }}>
        <TouchableOpacity onPress={ () => this.props.function()} >
            <Icon.Foundation color='#666666' name="x" size={30} />
        </TouchableOpacity>
    </View>
    <Text style={styles.text}>Delete Word</Text>
    <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 22 }}>{this.props.wordName}</Text>
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
        <Text style={styles.text}>New Word</Text>
        <Input
            containerStyle={{ marginTop: 12 }}
            placeholder='Type First Word'
            inputContainerStyle={{ borderBottomWidth: 2, borderRadius: 10 }}
            onChangeText={(text) => this.setState({text1: text})}
            leftIcon={
            <Icon.MaterialCommunityIcons
                name='pencil'
                size={24}
                color='black'
            />
            }
        />
        <Input
            containerStyle={{ marginTop: 12 }}
            placeholder='Type Second Word'
            inputContainerStyle={{ borderBottomWidth: 2, borderRadius: 10 }}
            onChangeText={(text) => this.setState({text2: text})}
            leftIcon={
            <Icon.MaterialCommunityIcons
                name='pencil'
                size={24}
                color='black'
            />
            }
        />
        <View style={{ marginTop: 25 ,width: "60%"}}>
            <TouchableOpacity style={styles.button} onPress={() => this.sendInput()}>
                <Text style={{  fontSize: 18, color: '#fff' }}>Add</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

render(){
    return(
        <Modal
            isVisible={this.props.display === true}
            style={this.props.style}
            animationIn='bounceIn'
            onBackdropPress={() => this.props.function()}
            useNativeDriver={ true }
          >
            <View>
                <StatusBar backgroundColor="rgba(0,0,0,0.7)"  barStyle="light-content"/>
            </View>
            {this.renderChooseModal()}
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
    buttonGreen: {
        backgroundColor: "#00e676",
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