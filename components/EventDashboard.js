import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    TextInput, FlatList, Dimensions,
    Platform, TouchableOpacity, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//This component toggles the view that contains the inputs
import renderIf from './renderIf';

import eventData from './data/FlatListData';
import FlatListItem from './FlatListItem';
import AddNewEvent from './AddNewEvent';


const screenWidth = Dimensions.get('window').width;

export default class EventDashboard extends Component{
    constructor(props){
        super(props);
        this.state = ({
            status: false,
            deletedRowId: null,
           
        });
    }
    toggleStatus(){
        this.setState({status: !this.state.status});
        console.log(`toggle handler pressed ${this.state.status}`);
    }
    //function to refresh flatlist after deleting an item
    refreshFlatList = (deletedId) => {
        this.setState((prevState) => {
            return{
                deletedRowId: deletedId
            };
        });
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles.topbar}>
                    <Text style={{color:'white',fontSize:16,fontWeight:'bold', marginRight: 150}}>Event DashBoard</Text>
                    <TouchableOpacity 
                        onPress={()=>this.toggleStatus()}
                    >
                        <Icon name="md-add" size={30} color="white" style={{marginRight: 20}}/>
                    </TouchableOpacity>
                </View>
                {renderIf(this.state.status)(<View style={{height: 400}}>
                    <AddNewEvent />
                </View>)}
                <FlatList
                    data={eventData}
                    renderItem={({item, index}) => {
                        return(
                            <FlatListItem item={item} index={index} parentFlatList={this} ></FlatListItem>
                        );
                    }}
                >

                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 22
    },
    topbar: {
        backgroundColor: 'black',
        height: 64,
        width: screenWidth,
        marginTop: Platform.OS === 'ios' ? 34 : 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});