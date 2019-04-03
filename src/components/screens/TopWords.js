import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WordCard from '../ui-items/wordCard';
import { ScrollView } from 'react-native-gesture-handler';

class TopWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    //console.disableYellowBox = true;
  }

  goWordList(Id){
    this.props.navigation.navigate('WordList',{id: Id});
  }

  _renderCards(){
      var cards = []
      for(i=0; i<11; i++){
          cards.push(
              <WordCard key={i} goWordListScreen={(id) => this.goWordList(id)} id={i} />
          )
      }
      return cards
  }

  render() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Top 1000 Words</Text>
                {this._renderCards()}
            </View>
        </ScrollView>
    );
  }
}

export default TopWords;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    title:{
        marginTop:15,
        marginBottom:5,
        fontSize:35,
        fontWeight: 'bold'
    }
})