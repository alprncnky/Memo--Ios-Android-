import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from '../icons';

const width_ = Math.round(Dimensions.get('window').width)
const cardHeight = Math.round(width_/7)

class StatCard extends React.PureComponent {

  render() {

    return (
        <View style={[styles.card, {flexDirection:'row'}]}>
            <View style={{ flex:1, flexDirection:'column', borderTopLeftRadius:10, borderBottomLeftRadius:10  }}>
                <View style={{ flex:1, backgroundColor:this.props.color, borderTopLeftRadius:10, borderBottomLeftRadius:10 }}>
                    <Text> </Text>
                </View>
            </View>
            <View style={{ flex: 28 }}>
                <Text style={styles.text}>{this.props.listName}</Text>
            </View>
            <View style={{ flex:20, justifyContent:'center', flexDirection:'row'}}>
                <View style={{ padding:3, marginRight:10 }}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Icon.Ionicons name='md-eye' color='#000' size={20} />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text>{this.props.text1}</Text>
                    </View>
                </View>
                <View style={{ padding:3, marginRight:10, alignItems:'center'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Icon.MaterialCommunityIcons name="pencil" color='#000' size={20} />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text>{this.props.text2}</Text>
                    </View>
                </View>
                <View style={{ padding:3, alignItems:'center'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Icon.Foundation name="list-number" color='#000' size={20} />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text>{this.props.sayi}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        flex:1,
        backgroundColor:'#fff',
        height: cardHeight,
        marginLeft: 25,
        marginRight: 25,
        marginBottom:20,
        borderRadius: 10,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginLeft:8,
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    }
})


export default StatCard;
