import React, { Component } from 'react';
import { View, Text } from 'react-native';

class WordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent{this.props.navigation.state.params.id}</Text>
      </View>
    );
  }
}

export default WordList;
