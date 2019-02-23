import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from '../icons';

const {height, width} = Dimensions.get('window')
const cardwidth = Math.round(width * 0.8);

class TestCard extends React.PureComponent {

  render() {

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{this.props.listName}</Text>
            <View style={[styles.insideCard, {backgroundColor: this.props.bgcolor} ]}>
                <View style={{ flexDirection:'row', alignItems: 'center', justifyContent:'center', }}>
                    <Icon.Ionicons name='md-arrow-dropright' color={this.props.bgcolor} size={70} />
                    <View style={{ flex:1, }}>
                        <Text style={styles.text}>{this.props.word}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.passFunction()}>
                        <Icon.Ionicons name='md-arrow-dropright' color='#000' size={70} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: cardwidth,
        marginBottom: 2,
        backgroundColor: '#fff',
        marginTop:20,
        borderRadius: 20,
        borderColor: '#e6e6e6',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4
        
    },
    insideCard: {
        backgroundColor: '#fff2f4',
        flex:1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'center',
        padding: 10,
        fontSize: 25,
        color: '#000',
        fontWeight: 'bold',
    }
})


export default TestCard;
