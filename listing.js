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
import EventManagers from './EventManagers'


const screenWidth = Dimensions.get('window').width

export default class ListEvents extends Component {
	constructor(props){
		super(props)
	    this.state = {
	        managerName:'',
	        deleted: false,
	        processing: false,
	        toggleStatus: false,
	        managers: '',
	    }
	    this.handleStatistics = this.handleStatistics.bind(this)
	    //this.handleUpdateHere = this.props.handleUpdateHere.bind(this)
	   
	}

	showStatsModal = () => {
		this.refs.statsModal.open()
	}
	showManageModal = () => {
		this.refs.manageModal.open()
		this.setState({ idEvent:this.props.event.idEvent })
	}
	handleStatistics() {
		this.showStatsModal()
	}
	handleManage() {
		this.showManageModal()
		this.setState({ idEvent: this.props.event.idEvent })
	}
	handleUpdate() {
		//this.props.toggleStatus()
		//this.props.handleUpdateHere()
		alert(`id is: ${this.props.event.idEvent}`)
		
	}
	
	handleDelete() {
		Alert.alert(
			'Check this',
			`Sure to delete event: ${this.props.event.title} ?`,
			[
				{
					text: 'No',
					style: 'cancel'
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => {
						const id = this.props.event.idEvent;
						HttpRequest.delete(BEFORE_AUTH_URL+'trendingevent',id )
							.then((response) => response.json())
							.then((responseJson) => {
								this.setState({deleted: responseJson})
								alert('event deleted successfully')
							})
							.catch((err) => {
								this.setState({deleted: false})
								console.log("Ysudoou encountered the following error"+ err.message)
							})
					}
				}
			]

		)
		
	}
	handleAddManager(){
		this.setState({processing: !this.state.processing})
		if (this.state.managerName.length === 0) {
			alert('Manager name cannot be empty')
			return
		}
		const body = {
			"username": this.state.managerName,
			"eventId": this.props.event.idEvent,
		}
		HttpRequest.post(EVENTS_URL+'addmanager', body)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					processing: true,
					managerName: '',
				})
				alert('Name is: '+ JSON.stringify(responseJson) +'event id is: '+this.props.event.idEvent)

			})
			.catch((error) => {
				this.setState({processing: false})
				this.setState({
					username: '',
					// idEvent: '',
					error: true,
				})
				console.log('Faile to add manager, you encountered the following error'+ error.message)
			})



	}
    render() {
        return (
        	
            <View style={styles.container} >
            	<Fragment>
            		<Modal 
					ref={"statsModal"}
					coverScreen={true}
					// style={styles.modalStyle}
					onClose={() =>{ alert('Modal closed')}}
					swipeToClose={true}
					backdropOpacity={0.1}
				>
				
					<View style={styles.viewinModalStyles}>
						<View>
						<Text>Event Statistics</Text>
						<View style={{backgroundColor:'black', height:1}}></View>
						<Text>Viewing Statistics for : {this.props.event.title}</Text>
						</View>
						<View style={{flexDirection:'row', justifyContent:'space-around'}}>
							<FontAwesome name="thumbs-up"  size={15}  color="hotpink" />
							<Text> Likes: {this.props.event.countlikes ? this.props.event.countlikes : 0},</Text>
							<FontAwesome name="thumbs-down"  size={15}  color="hotpink" />
							<Text>Dislikes: {this.props.event.countdislikes? this.props.event.countdislikes : 0},</Text>
							<Text>Comments: {this.props.event.countcomments ? this.props.event.countcomments: 0 },</Text>
						</View>
					</View>

				</Modal>
				
				<Modal 
					ref={"manageModal"}
					coverScreen={true}
					// style={styles.modalStyle}
					onClose={() =>{ alert('Modal closed')}}
					swipeToClose={true}
					backdropOpacity={0.1}
				>
				
					<View style={styles.viewinModalStyles}>
						<Text>Manage Event </Text>
						<View style={{backgroundColor:'black', height:1, width:screenWidth}}></View>
						<Text>Event Title: {this.props.event.title}</Text>
						<Text>Add Manager</Text>
						<View style={{flexDirection: 'row', justifyContent:'space-around'}}>
							<TextInput 
								placeholder="Manager name"
								style={styles.manageInputStyle}
								value={this.state.managerName}
								underlineColorAndroid="transparent"
								returnKeyType="next"
								onChangeText = {(managerName) => this.setState({ managerName })}
							/>
							<TouchableOpacity 
									style={styles.addManagerButton}
									onPress={() => this.handleAddManager()}
								>
									<Text style={{color:'white'}}>Add Manager</Text>
								</TouchableOpacity>
						</View>
						<Text>Managers</Text>
						<View style={{backgroundColor:'black', height:1, width:screenWidth}}></View>
						<EventManagers />
					</View>
					

				</Modal>
				</Fragment>

                <View style={styles.content}>
                    <View style={{width:50}}>
                        <Text  style={styles.songStyle}>
                        	{this.props.event.title}</Text>  
                    </View>

                    <View>
                    <TouchableOpacity
                        onPress={() => this.handleStatistics()}
                    >
                        <Text style={{color:'blue', fontWeight: 'bold'}}>stats</Text>
                    </TouchableOpacity>
                    </View>

                    <View>
                    <TouchableOpacity
                        onPress={() => this.handleManage()}
                    >
                        <Text style={{color:'blue', fontWeight: 'bold'}}>manage</Text>
                    </TouchableOpacity>
                    </View>

                    <View>
                    <TouchableOpacity
                        onPress={() => this.handleUpdate()}
                    >
                        <Icon name="md-arrow-up" color="blue" size={30} style={styles.iconStyle} />
                    </TouchableOpacity>
                    </View>

                    <View>
                    <TouchableOpacity
                        onPress={() => this.handleDelete()}
                    >
                        <Icon name="md-close" color="red" size={30} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <View style={{backgroundColor: 'black', height:1}}></View>
                    </View>
                </View>
                


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection:'column'
    },
    content: {
         flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginBottom: 10
    },
    iconStyle: {

    },
    modalStyle: {
    	justifyContent: 'center',
    	borderRadius: Platform.OS === 'ios' ? 30 : 0,
    	shadowRadius: 10,
    	width: screenWidth - 10,
    	backgroundColor: 'grey',
    },
    manageInputStyle: {
    	borderRadius: 8, 
    	width:150, 
    	height:30, 
    	borderColor: 'grey',
    	borderWidth: 2,
    	margin:5,
    },
    addManagerButton: {
    	width: 150,
    	backgroundColor:'hotpink',
    	height: 30,
    	borderRadius: 8,
    	marginTop:10,
    	marginLeft: 20,
    	justifyContent:'center',
        alignItems: 'center',
    },
    viewinModalStyles: {
	    backgroundColor: "white",
	    margin:15,
	    borderRadius: 4,
	    height:400,
    },
});


672492337
654968117