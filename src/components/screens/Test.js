import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList} from 'react-native';
import { get, addList, addWord, deleteWord, deleteList } from '../Data';
import TestListCard from '../ui-items/testListCard'
import { NavigationEvents } from "react-navigation";

class Test extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            listName: null,
            words: null
        }
    }

    // fill data to data state
    componentDidMount() {
        this.loadData();
    }

    // Get data from Data.class
    async loadData() {
        this.setState({
             data: await get()
         })
    }

    // Go Question screen
    goQuestionScreen(index){
        this.props.navigation.navigate('Question',{data: this.state.data, no: index});
    }

    // render flastlist
    _renderFlatlist(){
        try{
            if(this.state.data.list != null){
                return(
                    <FlatList
                        data={this.state.data.list}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) =>
                            <TouchableOpacity disabled={item.liste.length > 0 ? false : true} onPress={() => this.goQuestionScreen(index)}>
                                <TestListCard bgcolor={item.liste.length > 0 ? '#fff' : '#cccccc'} name={item.name} badge={item.liste.length} />
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.name}
                    />
                )
            }
        }catch{}
    }

    render() {
        return (
        <View style={{ flex:1 }}>
        <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            />
            <View style={{ marginBottom: 10 ,flex:1, alignItems:'center'  }}>
            <NavigationEvents
                onWillFocus={() => {
                    //Trigger when this navigation screen on focus
                    this.loadData()
                }}
            />
            <Text style={{ marginTop:10 ,fontSize:50, color:'#333333' }}>Test Time!</Text>
            </View>
            <View style={{ flex:6 }}>
                <View style={{ flex:1 }}>
                    <TouchableOpacity activeOpacity={1} style={styles.mixBtn}>
                        <Text style={{ fontSize:23 ,color:'#fff' }}>
                            Choose your list
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex:5 }}>
                    {this._renderFlatlist()}
                </View>
            </View>
        </View>
        );
    }
}

export default Test;

const styles=StyleSheet.create({
    mixBtn:{
        flex:1, 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
        marginVertical: 10 ,
        backgroundColor:'#43a047'
    }
})