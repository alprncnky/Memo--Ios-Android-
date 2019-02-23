import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../icons'
import { Badge } from 'react-native-elements'

class TestListCard extends React.PureComponent {

  render() {

    return (
            <View style={{ height:60, flex:1, flexDirection:'row', backgroundColor:this.props.bgcolor }}>
                <View style={{ flex:4, justifyContent:'center' }}>
                    <Text style={{ marginLeft:15 ,fontSize: 16 }}>
                        {this.props.name}
                    </Text>
                </View>
                <View style={{ flex:1, flexDirection:'row', justifyContent:'center' }}>
                    <View style={{ flex:2,justifyContent:'center', alignItems:'flex-end', }}>
                        <Badge textStyle={{ fontSize:18 }} value={this.props.badge} status="primary" />
                    </View>
                    <View style={{ flex:1, flexDirection:'column', justifyContent:'center' }}>
                        <Icon.MaterialIcons name='keyboard-arrow-right' color='#000' size={28} />
                    </View>
                </View>
        </View>
    );
  }
}

export default TestListCard

