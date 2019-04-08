import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import Icon from '../icons';
import Swipeout from 'react-native-swipeout';
import ListModal from '../ui-items/ListModal';
import { getList, addList, addWord, deleteWord, updateWords } from '../Data';
import { NavigationEvents } from "react-navigation";

const width_ = Math.round(Dimensions.get('window').width)
const listTextSize = Math.round(width_/11.7)

// TODO: en son delete modal ına kelime ismini yolladım. 
//rowIndex le acik olan swipebuttonundan hangi satır oldugunu aldım ordan listedeki o satırın kelimesini delete moduluna yolladım.

class List extends Component {

   constructor(props){
     super(props);
     this.state = {
      data: null,
      visibleModal: null,
      modalName: null,
      rowIndex: null,
      modalNo: null,
      word1: null,
      word2: null
     }
   }

   closeSwipeButton(){
     this.setState({rowIndex: -1})
   }

   openDeleteModal(){
     this.setState({ modalNo: 2 })
     this.setState({ modalName: this.state.data[this.state.rowIndex].kelime1 +"-"+ this.state.data[this.state.rowIndex].kelime2})
     this.openModal()
   }

   openEditModal(){
    this.setState({ modalNo: 3 })
    this.setState({ word1: this.state.data[this.state.rowIndex].kelime1})
    this.setState({ word2: this.state.data[this.state.rowIndex].kelime2})
    this.openModal()
   }

   // call loadData when this screen is loaded
   componentWillMount(){
     this.loadData()
   }


   openAddModal(){
    console.log("openADDmodal");
    this.setState({ modalNo: 1 })
    this.openModal()
   }

    // open modal
    openModal() {
    this.setState({ visibleModal: true })
    }

   // after pressing add button on modal ( add word )
   getInput = async (txt1, txt2) => {
     console.log("getInput:modalNo"+this.state.modalNo+"txt1:"+txt1)
    if(txt1.length+txt2.length < 38){
      if(txt1.length > 0 && txt2.length > 0){
          this.modalTrigger()
          if(this.state.modalNo == 1){
            console.log("if else-1:")
            await addWord(this.props.navigation.state.params.index,txt1,txt2)
          }
          else if(this.state.modalNo == 3){
            console.log("if else-3:")
            await updateWords(this.props.navigation.state.params.index,this.state.rowIndex,txt1,txt2)
          }
          this.loadData()
      }
    }
  }

   // close modal
   modalTrigger = () => {
    this.setState({ visibleModal: false })
  }

   // delete list item 
   deleteWordBtn = async () => {
    console.log("deleteWord():"+this.state.rowIndex)
    await deleteWord(this.props.navigation.state.params.index,this.state.rowIndex)
    this.loadData()
    this.modalTrigger()
   }

  // refresh Flatlist  ( get data from local saved )
  async loadData() {
    this.setState({
      data: await getList(this.props.navigation.state.params.index)
    })
    console.log(this.state.data)
  }

  // color of Textview background in Flatlist
  getColor(number){
    var color = ""
      if( number < -2 )
        color="#E53935"
      else if( number < 0 )
        color="#FFEE58"
      else if( number == 0 )
        color="#03A9F4"
      else if( number < 3 )
        color="#0097A7"
      else if( number > 2 )
        color="#1DE9B6"
    return color
  }


    render() {
      // Buttons
    var swipeoutBtns = [
      {
        component:<View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: '#BDBDBD' }}><TouchableOpacity onPress={() => this.openEditModal()}><Icon.MaterialIcons name='edit' color='white' size={32}/></TouchableOpacity></View>
      },
      {
        component:<View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: 'red' }}><TouchableOpacity onPress={() => this.openDeleteModal()}><Icon.MaterialIcons name='delete' color='white' size={32}/></TouchableOpacity></View>
      }
    ]

      return (
        <View style={{ flex:1, backgroundColor: 'white' }}>
        <NavigationEvents
                onWillFocus={() => {
                    //Trigger when this navigation screen on focus
                    this.loadData()
                }}
            />
          <View style={styles.view1}>
              <View style={styles.listTextContainer}>
                <Text style={styles.listText}>{this.props.navigation.state.params.name}</Text>
              </View>
              <View style={styles.addContainer}>
                  <View>
                    <TouchableOpacity onPress={ () => this.openAddModal() }>
                      <View style={styles.addView}>
                          <Icon.Ionicons name='md-add' color='#333333' size={38} />
                      </View>
                    </TouchableOpacity>
                  </View>
              </View>
          </View>

          <View style={styles.container}>       
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <FlatList
                  data={ this.state.data }
                  extraData= {this.state.rowIndex}
                  renderItem={({item, index}) => 
                  <Swipeout style={{ backgroundColor:'white' }}
                   autoClose={true}
                   left={swipeoutBtns}
                   rowIndex={index}
                   close={this.state.rowIndex !== index}
                   onOpen={()=>(this.setState({ rowIndex: index }))}
                   >
                      <View style={styles.card}>
                          <View style={styles.card1}>
                              <Text style={styles.item}>{item.kelime1} - {item.kelime2}</Text>
                          </View>
                          <View style={styles.card2}>
                              <View style={ [styles.colorContainer, {backgroundColor: this.getColor(item.count)} ]}>
                                <Text style={{ fontSize: 6}}>   </Text>
                              </View>
                          </View>
                      </View>
                  </Swipeout>
                  }
                  keyExtractor={(item, index) => item.kelime1+item.kelime2+index}
                />
              </View>              
            </View>

            <ListModal
              display = { this.state.visibleModal }
              function = {this.modalTrigger}
              wordName = {this.state.modalName}
              input = {this.getInput}
              word1 = {this.state.word1}
              word2 = {this.state.word2}
              whichModal = {this.state.modalNo}
              deleteFunction = {this.deleteWordBtn}
            />
            
        </View>
      );
    }
  }

export default List;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card1:{
    flex:10
  },

  card2: {
    flex:1,
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    marginRight: 15,
  },

  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 5,
  },
  item: {
    marginLeft: 15,
    fontSize: 16,
    padding: 5
  },

  colorContainer:{
    marginTop:8,
    marginBottom:8,
    paddingLeft:6,
    paddingRight: 6,
    borderRadius: 20,
  },

  view1: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: "flex-end"
  },

  listTextContainer: {
    marginLeft: 20,
  },

  listText: {
    color: '#000',
    fontSize: listTextSize,
    fontWeight: 'bold',
  },
  addContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginRight: 20,
  },
  addView: {
    borderColor: '#333333',
    borderWidth: 2,
    borderRadius: 10,
    width: 36,
    height: 36,
    justifyContent:'center',
    alignItems: 'center'
  },
})