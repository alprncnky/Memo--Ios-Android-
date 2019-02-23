import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    }
})


export default Card;
