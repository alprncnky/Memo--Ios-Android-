import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar, Divider } from 'react-native-elements';
import data from '../../../sentences.json';
import { ScrollView } from 'react-native-gesture-handler';

class Sentences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            list:''
        };
        console.disableYellowBox = true;
    }

    componentWillMount(){
        this.setState({
            list: data[this.props.navigation.state.params.data]
        })
    }

    updateSearch = search => {
        this.setState({ search });
    };

    renderList() {
        return this.state.list.map((item) => {
            return (
                <React.Fragment>
                    <Text style={{margin:15 ,fontSize:20, fontWeight:'600' }}>
                        {item}
                    </Text>
                    <Divider style={{marginLeft:10, marginRight:10, height:1, backgroundColor: '#e6e6e6' }} />
                </React.Fragment>
            );
        });
    }

    renderSearch() {
        return this.state.list.map((item) => {
            var str = JSON.stringify(item)
            if(str.includes(this.state.search)){
                return (
                    <React.Fragment>
                        <Text style={{backgroundColor:'#ffffb3', margin:15 ,fontSize:20, fontWeight:'600'}}>
                            {item}
                        </Text>
                        <Divider style={{marginLeft:10, marginRight:10, height:1, backgroundColor: '#e6e6e6' }} />
                    </React.Fragment>
                );
            }
        });
    }

  render() {
    const { search } = this.state;
    return (
      <View style={{flex:1}}>
        <ScrollView>
            <SearchBar
                placeholder="Search Words..."
                platform={"ios"}
                containerStyle={{ backgroundColor:'white' }}
                onChangeText={this.updateSearch}
                value={search}
            />
            { this.state.search.length > 0 ? this.renderSearch() : this.renderList() }
        </ScrollView>
      </View>
    );
  }
}

export default Sentences;
