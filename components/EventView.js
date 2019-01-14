import React, { Component } from 'react'

import {
    View, Text,Platform,ScrollView,
    StyleSheet, Dimensions,TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import eventData from './data/FlatListData'
import GridView from 'react-native-super-grid'
//import { getUserFromServer } from './data/Network'

const screenWidth = Dimensions.get('window').width

export default class EventView extends Component {
    constructor(props){
        super(props);
        this.state = {
            // usersFromApi: []
        }
    }

    // componentDidMount(){
    //     this.refreshDataFromServer()
    // }
    // refreshDataFromServer = () => {
    //     getUserFromServer().then((users) => {
    //         this.setState({usersFromApi: users})

    //     }).catch((error) => {
    //         this.setState({usersFromApi: []})
    //     })
    // }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={styles.topBar}><Text style={{color: 'white', fontWeight:'bold', fontSize:16, paddingTop: 50}}>Events available</Text></View>
                <View >
                    <ScrollView>
                        <GridView 
                            itemDimension = {130}
                            items={eventData}
                            //items={this.state.usersFromApi}
                            style={styles.gridView}
                            renderItem={item => (
                                    // eventData.length === 0 ? (<Text style={{color:'red', fontSize:30, fontWeight='bold'}}>Sory no events for this artist</Text>) :
                                    <View style={[styles.itemContainer, { backgroundColor: item.id % 2 == 0 ? 'tomato': 'lightblue' }]}>
                                        <Text style={styles.itemTopic}>Topic:{item.topic}</Text>
                                        <Text style={styles.itemDetails}>Details:{item.details}</Text>
                                        <TouchableOpacity 
                                            onPress={(event) => {
                                                alert(item.id)
                                            }}
                                            style={styles.viewButton}
                                        >
                                            <Text>View</Text>
                                        </TouchableOpacity>
                                        <Icon name="md-heart" size={30} color="white" style={styles.loveIcon} />
                                    </View>
                            )}

                        />
                    </ScrollView>
                </View>
            
            </ View>
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        width: screenWidth,
        height: 100,
        backgroundColor: 'grey',
        paddingTop: Platform.OS === 'ios' ? 34 : 0,
        alignItems:'center'
    },
    gridView: {
        paddingLeft: 0,
        flex: 1,
        width: screenWidth,
    },
    itemContainer: {
        justifyContent: 'space-between',
        borderRadius: 3,
        padding: 10,
        height: 200,
    },
    itemTopic: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    itemDetails: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white'
    },
    viewButton: {
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        height: 20,
        width: 50,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 0
    },
    loveIcon: {
        paddingLeft: 110,
    }

})

