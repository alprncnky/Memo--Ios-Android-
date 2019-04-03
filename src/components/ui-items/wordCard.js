import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions, Image } from 'react-native';

const width_ = Math.round(Dimensions.get('window').width)
const cardHeight = Math.round(width_/6)
const cardWidth = cardHeight*4.5

const name = ["English","Spanish","Turkish","Arabic","Portuguese","French","German","Italian","Russian","Indonesian","Hindi"]
const imagePath = [require('../../../images/en512.png'), require('../../../images/es512.png'), require('../../../images/tr512.png'), require('../../../images/ar512.png'), require('../../../images/pr512.png'), require('../../../images/fr512.png'), require('../../../images/gr512.png'), require('../../../images/it512.png'), require('../../../images/rs512.png'), require('../../../images/id512.png'), require('../../../images/in512.png')]

class WordCard extends React.PureComponent {

  gotoWordListScreen(id){
    this.props.goWordListScreen(id);
  }

  render() {
    return (
            <TouchableHighlight onPress={() => this.gotoWordListScreen(this.props.id)} underlayColor="#e6e6e6" activeOpacity={0.8} style={[styles.card]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Image style={{flex:1 , resizeMode:'contain', width: cardHeight, height: cardHeight }}
                                    source={imagePath[this.props.id]}
                                />
                        </View>
                        <View style={{flex:3}}>
                            <Text style={styles.text}>{name[this.props.id]}</Text>
                        </View>
                    </View>
            </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: cardHeight,
        width: cardWidth,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
    }
})


export default WordCard;
