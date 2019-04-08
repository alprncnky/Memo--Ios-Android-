import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const width_ = Math.round(Dimensions.get('window').width)
const listTextSize = Math.round(width_/13.7)

class Card extends React.PureComponent {

  render() {

    return (
        <View style={[styles.card , {backgroundColor: this.props.id}]}>
            <Text style={styles.text}>{this.props.listName}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        marginLeft: 20,
        marginRight: 20,
        marginTop:13,
        marginBottom: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 3,
            height: 3
        },
    },
    text: {
        fontSize: listTextSize,
        color: '#fff',
        fontWeight: 'bold',
    }
})


export default Card;
