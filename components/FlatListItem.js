import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    Dimensions,Image, Alert
} from 'react-native'

import LongPressForAndroidSwipeout from 'react-native-swipeout-longpressforandroid';

import eventData from './data/FlatListData';

const screenWidth = Dimensions.get('window').width;

export default class FlatListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeRowId: null
        };
    }
    render(){
        const longPressSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowId != null){
                    this.setState({activeRowId:null});
                }
            },
            onOpen: (secId, rowId, direction) => {
               this.setState({activeRowId: this.props.item.id}); 
            },
            right: [
                {
                    onPress: () =>{
                        alert('update pressed')
                    },
                    text: 'Update', type: "primary"
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowId;
                        Alert.alert(
                            '',
                          'Sure to delete?',
                         [
                          {text: 'No', onPress: ()=>console.log(''), style: 'cancel'},
                          {text: 'Yes', onPress: () => {
                              eventData.splice(this.props.index, 1)
                              //refresh flatlist
                              this.props.parentFlatList.refreshFlatList(deletingRow)
                              alert('Delete Successful')
                          }}   
                         ]   
                        )
                    },
                    text: "Delete", type: "delete"
                }
            ],
            rowId:this.props.index,
            secId: 1
        };
        return(
            <LongPressForAndroidSwipeout {...longPressSettings}>

                <View style={{flex:1, flexDirection: 'column'}}>
                    <View style={styles.containItems}>
                        <Image 
                            source={{url: this.props.item.imageUrl}}
                            style={styles.imageStyle}
                        >
                        </Image>
                        <View style={{flex:1, flexDirection:'column'}}>
                            <Text style={styles.listItem}>{this.props.item.topic}</Text>
                            <Text style={styles.listItem}>{this.props.item.details}</Text>
                            <Text style={styles.listItem}>{this.props.item.date}</Text>
                            <Text style={styles.listItem}>{this.props.item.country}</Text>
                            <Text style={styles.listItem}>{this.props.item.city}</Text>
                            <Text style={styles.listItem}>{this.props.item.interested}</Text>
                            <Text style={styles.listItem}>{this.props.item.price}</Text>
                        </View>
                    
                    </View>
                    <View style={styles.separator}></View>
                </View>
           

            </LongPressForAndroidSwipeout>
            
           
            
        );
    }
}

const styles = StyleSheet.create({
    containItems: {
        flex: 1,
        backgroundColor: "lightblue",
        width: screenWidth,
        flexDirection: 'row'
    },
    imageStyle: {
        width:100,
        height:100,
        margin:5
    },
    listItem: {
        color:'white',
        padding: 10,
        fontSize: 16
    },
    separator: {
        height: 1,
        backgroundColor:'white'
    }
});