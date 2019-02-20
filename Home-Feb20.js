
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    BackHandler,
    Image,
    TouchableWithoutFeedback,
    FlatList

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  EventCard  from './../../authViews/EventCard';
import { Feather } from '@expo/vector-icons';

import Spinner from 'react-native-loading-spinner-overlay';
import HttpRequest  from './../../../api/HttpRequest';

import {EVENTS_URL,EVENT_COVER_IMAGES, BEFORE_AUTH_URL}  from './../../../constant/constant';


class EventsHome extends Component {
    constructor() {
        super();
        
    }
    state = {
        trendingEvents: "",
        procesing: false,
    }
    

    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
    };

    componentDidMount() {
        this.setState({ procesing:true})
        HttpRequest.get( EVENTS_URL+'trending',)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    trendingEvents: responseJson,
                    procesing:false,


                });
                 <Spinner visible={this.state.procesing} textContent={"Loading Events..."} textStyle={{color: '#FFF'}} />
                console.log("events coming from db are :"+ JSON.stringify(responseJson))
                // this.setState({ trendingmusic: responseJson });

            })
           .catch(err => {
                this.setState({ procesing: false });
                this.setState({ error: true });

            console.log("error that"+ err.message)
            if(err.message === "Network request failed"){
                console.log("connection issues failed");
                Actions.errNet();
            }
        });
    };


    render() {
     return (
        <View style={styles.container}>
                    <View style={styles.rowStyle}>
                     <Spinner visible={this.state.procesing} textContent={"Loading Events..."} textStyle={{color: '#FFF'}} />
                        <FlatList
                            data={this.state.trendingEvents}
                            keyExtractor = {(item, index) => item.idEvent}
                            horizontal={false}
                            numColumns={1}
                            
                            renderItem={(
                                   ({item}) => <EventCard imgPath={EVENT_COVER_IMAGES}  event = {item} />
                            )}
                                      />
                         <Spinner visible={false} textContent={"Loading Events..."} textStyle={{color: '#FFF'}} />
                    </View>

           
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#EDF6F7',
        // alignItems: 'center'
    },

    cardHeader: {
        flexDirection: 'row',
    },
    songHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    songStyle: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: '200',
        color: '#252525',
        fontSize: 15
    },

    imageStyle: {
        height: 90,
        width: null
    },
    play: {
        width: 50,
        height: 50,
        borderRadius: 25,

        borderColor: "white",
        marginBottom:10,
        alignSelf:'flex-start',
        position: 'absolute',
        marginTop:100,
        marginLeft: 108,
        zIndex:40
      },
    batch: {
        height: 20,
        width: 70,
        top: 125,
        left: 180,
        position: 'absolute',
        zIndex:50,
        borderWidth: 1,
        borderColor: '#E5F7F0',
        backgroundColor: '#E5F7F0', 
        borderBottomLeftRadius:25,
      },
    batchText: {
        fontWeight: "bold",
        color: 'black',
        fontSize: 14,
        alignSelf:"center",
    },
    text: {
        paddingLeft: 5,
        marginLeft: 5,
        marginRight: 5,
        color: 'white',
  },
    rowStyle: {
        // flexDirection: 'row',
        // flex:1,
        // flex: 1,
    },

});
export default EventsHome;