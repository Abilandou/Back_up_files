'use strict';
const isFunction = input => typeof input === 'function';
export default predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;


//import it as follows 
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   ActivityIndicator,
//   TouchableHighlight,
//   View
// } from 'react-native';
// import renderIf from './renderIf'

// class fetchsample extends Component {
//   constructor(){
//     super();
//     this.state ={
//       responseData:null,
//        animating: true,
//        status:false
//     }
//   }
//   toggleStatus(){

//   this.setState({
//     status:!this.state.status
//   });
//   console.log('toggle button handler: '+ this.state.status);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//        {renderIf(this.state.status)(
//          <Text style={styles.welcome}>
//          I am dynamic text View
//          </Text>
//        )}

//         <TouchableHighlight onPress={()=>this.toggleStatus()}>
//           <Text> touchme </Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
