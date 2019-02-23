import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, fontScale } = Dimensions.get("window");

class Letter extends React.PureComponent {

  constructor(props){
    super(props)
    this.state = {
      value: [],
      color: 'gray'
    }
  }

componentDidMount() {
  this.props.onRef(this)
  this.changeValue("")  // change value state for refresh the render and put line on each letter
}

componentWillUnmount() {
  this.props.onRef(undefined)
}

// change state value
changeValue(txt,pass){
    valueArray=[]
    try{ txtlength = txt.length }catch{ txtlength=0 }
    if(txtlength <= this.props.len){
      for(i=0; i<txtlength;i++){
        valueArray.push(txt.charAt(i))
      }
    }
    else{
      for(i=0; i<this.props.len;i++){
        valueArray.push(txt.charAt(i))
      }
    }
    for(i=txtlength; i<this.props.len; i++){
      valueArray.push('')
    }
    this.setState({
      value: valueArray,
      color: 'gray'
      
    })
    if(pass != null){
      // if pass button clicked then change answer color to green
      this.setState({
        color: '#81c784'
      })
    }
}


renderLetters() {
  return (
        this.state.value.map((item, index) =>
          <React.Fragment key={index}>
            <View style={{ flex: 3, backgroundColor:'white', borderBottomColor: this.state.color, borderBottomWidth: 4, justifyContent: 'center' }}>
              <Text
                style={styles.letterstyle}>{item}
              </Text>
            </View>  
            <View style={{ flex: 1, borderBottomColor: 'white', borderBottomWidth: 4, }} />
          </React.Fragment> )
  )
}

  render() {

    return (     
        <React.Fragment>
          <View style={{ flex: 3, backgroundColor:'white', borderBottomColor: 'white', borderBottomWidth: 4, }} />  
          <View style={{ flex: 1, borderBottomColor: 'white', borderBottomWidth: 4, }} /> 

          {this.renderLetters()}

          <View style={{ flex: 3, backgroundColor:'white', borderBottomColor: 'white', borderBottomWidth: 4, }} />  
        </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  letterstyle: {
    fontSize: 30/fontScale,
    alignSelf: 'center',
    marginBottom: 0,
    color: '#000',
  }
})


export default Letter;
