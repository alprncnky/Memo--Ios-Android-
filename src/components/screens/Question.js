import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, StatusBar, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { get, addList, addWord, deleteWord, deleteList, updateScore } from '../Data';
import TestCard from '../ui-items/testCard';
import ListModal from '../ui-items/ListModal';
import Letter from '../ui-items/letters';
import Icon from '../icons';
import { getMeWordsFromList, getWordsNo } from '../testWord';


class Question extends Component {

  constructor(props){
    super(props);
    this.state = {
      listWords: [],
      wordsNo: [],
      listName: "",
      visibleModal: null,
      wordLength: null,
      word1:"",
      word2:"",
      order:0,
      answer: "",
      cardColor:"#fff2f4"
    }
  }

  componentWillMount() {
    this.loadData();
  }

  // get words from list for 
  loadData() {
    this.setState({
      wordsNo: getWordsNo(this.props.navigation.state.params.data.list[this.props.navigation.state.params.no].liste),
      listWords: getMeWordsFromList(this.props.navigation.state.params.data.list[this.props.navigation.state.params.no].liste)
    }, () => {
      this.getlstName()
      this.setQuestionWords()
    })
  }

  // get listname from Test.params index
  getlstName(){
    this.setState({
      listName: this.props.navigation.state.params.data.list[this.props.navigation.state.params.no].name
    })
  }

  // choose words from listWords state and set the reletive states  (example:  listWords[0]...)
  setQuestionWords(){
    len=this.state.listWords.length
    orderNo=this.state.order
    console.log("questionWords()")
    console.log("questionWords():length:"+orderNo)
    console.log("questionWords():length:"+len)
    if(orderNo<len){
      console.log("questionWords()")
      this.setState({
        word1: this.state.listWords[orderNo].kelime1,
        word2: this.state.listWords[orderNo].kelime2,
        wordLength: this.state.listWords[orderNo].kelime2.length,
        cardColor: "#fff2f4",
        order: orderNo + 1
      }, () => {
        this.child.changeValue(" ")
      })
    }
    else{
      // liste bitti. 1 cycle tamamlandi. yeniden getMewords() cagirip listWord state i doldur
      this.clearData()
      console.log("bu yazi geldi mi")
      this.props.navigation.goBack()
    }
  }

  // clear states
  clearData(){
    this.setState({
      word1: "",
      word2: "",
      wordLength: null,
      cardColor: "#fff2f4",
      order: 0
    }, () => {
      this.child.changeValue(" ")
    })
  }

  //check answer when press button
  checkAnswer(){
    if(this.state.word2 == this.state.answer){
      // correct answer
      console.log("checkAnswer():"+this.props.navigation.state.params.no+"-"+this.state.wordsNo[this.state.order-1])
      this.setState({ cardColor: "#81c784" })
      updateScore(this.props.navigation.state.params.no,this.state.wordsNo[this.state.order-1],true)
      setTimeout(() => {this.setQuestionWords()}, 400);
    }
    else {
      // wrong answer
      this.setState({ cardColor: "#f44336" })
      updateScore(this.props.navigation.state.params.no,this.state.wordsNo[this.state.order-1],false)
    }
  }

  // pass button clicked
  passCard = () =>{
    this.setState({ cardColor: "#fff59d" })
    updateScore(this.props.navigation.state.params.no,this.state.wordsNo[this.state.order-1],false,"pass")
    this.child.changeValue(this.state.word2, "green")
    setTimeout(() => {this.setQuestionWords()}, 1800);
  }


  //********************************************** */

  // get input from modal textinput
  getInput = (txt) => {
    this.modalTrigger()
    this.child.changeValue(txt) // change and show letters 
    this.setState({ answer: txt })
  }

  // open modal
  openModal() {
    this.setState({ visibleModal: true })
  }

  // close modal
  modalTrigger = () => {
    this.setState({ visibleModal: false })
  }

  // display card
  _renderCard() {
    return(
      <React.Fragment>
          <View style={{ flex:3 , alignItems: 'center' , backgroundColor: 'white'}}>
            <TestCard passFunction={this.passCard} listName={this.state.listName} bgcolor={this.state.cardColor} word={this.state.word1} />
          </View>
          <View style={{ flex:2, marginTop:5 }}>
              <TouchableOpacity style={{ flex:1 }} onPress={ () => this.openModal() }>
                <View style={{ flex:1, flexDirection: 'row', justifyContent:'center' }}>
                    <Letter len={this.state.wordLength} onRef={ref => (this.child = ref)} />
                </View>
              </TouchableOpacity>
              <View style={{ flex:2, flexDirection: 'row' }}>
                  <View style={{ flex:1 }}></View>
                  <View style={{ flex:1 }}>
                      <View style={{ flex:1,justifyContent: 'center', alignItems:'center' ,borderRadius:100, marginVertical:30 ,marginHorizontal:20, backgroundColor:'#9c27b0' }}>
                        <TouchableOpacity onPress={() => this.checkAnswer()} style={{ flex:1, justifyContent: 'center', alignItems:'center' }}>
                            <Icon.Ionicons name='ios-arrow-forward' color='#fff' size={50} />
                        </TouchableOpacity>
                      </View>
                  </View>
                  <View style={{ flex:1 }}></View>
              </View>
          </View>
      </React.Fragment>
    )
  }


  render() {
    return (
      <View style={{ flex:1, backgroundColor: '#fff' }}>
        <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
        />

      {this._renderCard()}
        
      <ListModal
        display = { this.state.visibleModal }
        function = {this.modalTrigger}
        whichModal = {4} 
        input={this.getInput}
        style={styles.inputStyle}
      />
      </View>
    );
  }
}

export default Question;

const styles = StyleSheet.create({
  inputStyle: {
    margin:0,
    justifyContent: 'flex-end'
  }
})