import React, {Fragment, Component } from 'react';
import {
    View, Text, StyleSheet,
    BackHandler, Dimensions,
    TouchableOpacity,ScrollView,
    Platform, Alert,TextInput,
    FlatList,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import HttpRequest  from './../../../api/HttpRequest';
import {EVENTS_URL,EVENT_COVER_IMAGES, BEFORE_AUTH_URL}  from './../../../constant/constant';
import Modal from 'react-native-modalbox'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width


class DisplayManagers extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<View><Text>{this.props.event.username}</Text></View>
		)
	}
}

export default class EventManagers extends Component {
	constructor(props){
		super(props)
		this.state = {
			managers: '',
			processing: false,
		}
	}
	componentDidMount(){
		HttpRequest.get(EVENTS_URL+'getmanagers',)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				managers: responseJson
			})
			console.log(`Managers are ${JSON.stringify(responseJson)} and `)
		})
		.catch((error) => {
			this.setState({processing: false})
			console.log(`You encountered the error ${error.message} when getting managers`)
		})
	}
	render(){
		return(
			<View style={{backgroundColor:'blue'}}>
				<FlatList 
					data={this.state.managers}
					keyExtractor={(item, index) => item.idEvent}
					renderItem = {(

						({item}) => <DisplayManagers event={item} />	
					)}
				>
				</FlatList>
				<Text>Thank God it works</Text>
			</View>
		)
	}
}
