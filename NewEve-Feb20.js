
import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    BackHandler,
    Image,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  ListEvents  from './ListEvents';
import { Feather } from '@expo/vector-icons';

import HttpRequest  from './../../../api/HttpRequest';

import {EVENTS_URL,EVENT_COVER_IMAGES, BEFORE_AUTH_URL}  from './../../../constant/constant';

import renderIf from './renderIf'
import EventDashboard from './EventDashboard'

class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
            trendingEvents: "",
            status: false,
            procesing:false,
            deletedActiveEvent:null,
        }
    }

    //function handles toggle options
    toggleStatus(){
      this.setState({status: !this.state.status})
      console.log(`toggle handler pressed ${this.state.status}`)
    }
    handleUpdateHere(){
        this.toggleStatus()
    }
    refreshFlatList = (deleteEvent) => {
        this.setState((prevState) => {
            return {
                deletedActiveEvent: deleteEvent
            };
        })
    }
    componentDidMount() {
        this.setState({procesing:true})
        HttpRequest.get( EVENTS_URL+'latest',)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    trendingEvents: responseJson,
                    procesing:false,
                });
                console.log("events coming from db are :"+ JSON.stringify(responseJson))

            })
           .catch(err => {
                this.setState({ procesing: false });
                this.setState({ error: true });

            console.log("You had the error"+ err.message)
            if(err.message === "Network request failed"){
                console.log("connection issues failed");
                Actions.errNet();
            }
        });
    };


    render() {
     return (
        <View style={styles.container}>

        <View style={{height: 25, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => this.toggleStatus()}
            >
            <Text style={{fontWeight: 'bold', marginRight: 5, color: 'hotpink'}}>Add Event</Text>
            </TouchableOpacity>
      </View>

         {renderIf(this.state.status)(<View style={{height: 500}}>
            <EventDashboard />
        </View>)}
            <View style={styles.headers}>
                <Text>Title</Text>
                <Text>Statistics</Text>
                <Text>Manage</Text>
                <Text>Update</Text>
                <Text>Delete</Text>
            </View >
            <View>
                <FlatList
                    data={this.state.trendingEvents}
                    keyExtractor = {(item, index) => item.idEvent}
                    horizontal={false}
                    numColumns={1}
                    renderItem={(
                            ({item}) => <ListEvents event = {item} parentFlatList={this}/>
                    )}
                />
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDF6F7',
    },
    headers: {
         flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6
    },
});
export default NewEvent;