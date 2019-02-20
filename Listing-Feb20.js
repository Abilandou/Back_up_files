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
import UpdateEvent from './UpdateEvent'

const screenWidth = Dimensions.get('window').width



class DisplayManagers extends Component{
	constructor(props){
		super(props)
		this.state = {
			deleted: false,

		}
	}
	deleteManager(){
		Alert.alert(
			'Look at this',
			`Sure to remove manager: ${this.props.event.name} ?`,
			[
				{
					text: 'No',
					style: 'cancel'
				},
				{
					text: 'Remove', 
					style: 'destructive',
					onPress: () => {
						this.setState({deleted:false})
						const body = {
							"username": this.props.event.name,
							"eventId": this.props.event.idEvent,
						}
						
						HttpRequest.post(EVENTS_URL+'deletemanager',body)
						.then((response) => response.json())
						.then((responseJson) => {
							this.setState({deleted: true})
							console.log(`Deleted manager is ${JSON.stringify(responseJson)}`);
						alert(this.props.event.name+ ' removed successfully');
						})
						.catch((error) => {
							this.setState({deleted:false})
							console.log(`You encountered the error ${error.message} while removing manager ${this.props.event.name}`)
						})	
					}
				}
			]

		)
		
	}
	render(){
		return(
			<View style={{
				flexDirection:'row', 
				justifyContent:'space-between',
				backgroundColor: this.props.event.idEvent % 2 == 0 ? '#E5F7F0' : 'white',

			}}>
				<Text>{this.props.event.name}</Text>
				<TouchableOpacity
					onPress={() => this.deleteManager()}
				>
					<Text style={{color:'blue'}}>Remove</Text>
				</TouchableOpacity>
				
			</View>
		)
	}
}



export default class ListEvents extends Component {
	constructor(props){
		super(props)
	    this.state = ({
	        managerName:'',
	        deleted: false,
	        processing: false,
	        toggleStatus: false,
	        managers: '',
	        status: false,
	        title:'',
	    });
	   this.handleUpdate = this.handleUpdate.bind(this);
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
		this.showEventManagers()
	}

	//function handles toggle options
    showUpdateModal = () => {
      this.refs.updateModal.open()
    }

	handleUpdate() {
		this.showUpdateModal()
	}

	showEventManagers(){
		const body = {
			"eventId": this.props.event.idEvent,
		}
		HttpRequest.post(EVENTS_URL+'getmanagers',body)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				managers: responseJson
			})
			console.log(`Managers are ${JSON.stringify(responseJson)} `)
		})
		.catch((error) => {
			this.setState({processing: false})
			console.log(`You encountered the error ${error.message} when getting managers`)
		})
	}
	
	handleDeleteEvent() {
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
						
						const deletingEvent = this.props.event.idEvent;
						const body = {
							"idEvent":this.props.event.idEvent,
						}
						HttpRequest.post(EVENTS_URL+'deleteevent', body)
						.then((response) => response.json())
						.then((responseJson) => {
							this.setState({deleted:true})
							console.log('successfully deleted'+JSON.stringify(responseJson))
							alert(`Event: ${this.props.event.title} deleted successfully`);
							//Refresh flatList after delete
							this.props.parentFlatList.refreshFlatList(deletingEvent)
						})
						.catch((error) => {
							this.setState({deleted:false})
							console.log('The error: '+error.message+' while deleting: '+this.props.event.title);
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
			return;
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
        	
            <View style={{ flex: 1,
	        			backgroundColor: this.props.event.idEvent % 2 == 0 ? '#E5F7F0' : 'white',
	       				flexDirection:'column'}} >
            	<Fragment>

	            	<Modal
		            	ref={"updateModal"}
		            	coverScreen={true}
		            	style={styles.updateModalStyle}
		            	swipeToClose={true}
		            	backdropOpacity={0.5}
	            	>
		            	
		            	<View style={{margin:10}}>
		            	<Text>Updating information for: {this.props.event.title}</Text>
		            	<View style={{backgroundColor:'black', height:1}}></View>
		            	</View>

		            	<View style={{height: 500, marginTop:30}}>
				            <UpdateEvent  />
				        </View>

	            	</Modal>
            		<Modal 
						ref={"statsModal"}
						coverScreen={true}
						style={styles.modalStyle}
						onClose={() =>{ alert('Modal closed')}}
						swipeToClose={true}
						backdropOpacity={0.5}
					>
				
					<View style={styles.viewinModalStyles}>

						<View>
						<Text>Event Statistics</Text>
						<View style={{backgroundColor:'black', height:1, marginBottom:10}}></View>
						<Text style={{marginBottom:10}}>Viewing Statistics for : {this.props.event.title}</Text>
						</View>

						<View style={{flexDirection:'row', justifyContent:'space-around', marginBottom:10}}>
							<FontAwesome name="thumbs-up"  size={15}  color="hotpink" />
							<Text> Likes: {this.props.event.countlikes ? this.props.event.countlikes : 0},</Text>
							<FontAwesome name="thumbs-down"  size={15}  color="hotpink" />
							<Text>Dislikes: {this.props.event.countdislikes? this.props.event.countdislikes : 0},</Text>
							<Text>Comments: {this.props.event.countcomments ? this.props.event.countcomments: 0 },</Text>
						</View>

						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
							<Text>Country: </Text>
							<Text>{this.props.event.country}</Text>
							
						</View>

						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
							<Text>City: </Text>
							<Text>{this.props.event.location}</Text>
						</View>
						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
							<Text>Venue:</Text>
							<Text>{this.props.event.venue}</Text>
						</View>
						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
							<Text>Date:</Text>
							<Text>{this.props.event.eventDate}</Text>
						</View>
						
						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
						 <Text>Standard Price: </Text>
						 <Text style={{color:'hotpink'}}>${this.props.event.standard}</Text>
						</View>

						<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:5}}>
							<Text> Gold Price: </Text>
							<Text style={{color:'hotpink'}}>${this.props.event.vipprice ? this.props.event.vipprice : 'Not determined'}</Text>
						</View>

						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
							<Text> Silver Price</Text>
							<Text style={{color:'hotpink'}}>${this.props.event.vvipprice ? this.props.event.vvipprice: 'Not determined'}</Text>
						</View>	

						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
							<Text> Discount</Text>
							<Text style={{color:'hotpink'}}>${this.props.event.discount ? this.props.event.dicount: 'No discount'}</Text>
						</View>

						<View style={{justifyContent:'space-between', flexDirection:'row', marginBottom:5}}>
							<Text>Orders Made(Purchase): </Text>
							<Text>{this.props.event.countorders}</Text>
						</View>	
						<View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>	
							<Text>Sponsor</Text> 
							<Text>{this.props.event.sponsor ? this.props.event.sponsor : 'No sponsor.'}</Text>
						</View>
						
					</View>

				</Modal>
				
				<Modal 
					ref={"manageModal"}
					coverScreen={true}
					style={styles.modalStyle}
					onClose={() =>{ alert('Modal closed')}}
					swipeToClose={true}
					backdropOpacity={0.5}
				>
				
					<View style={styles.viewinModalStyles}>
						<Text>Manage Event </Text>
						<View style={{backgroundColor:'black', height:1, width:screenWidth}}></View>
						<Text>Event Title: {this.props.event.title}</Text>
						<View style={{justifyContent:'center', alignItems:'center', marginTop:10}}><Text>Add Manager</Text></View>
						<View style={{flexDirection: 'row', justifyContent:'space-around', marginTop:20, marginBottom:20, marginRight:10}}>
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
									<Text style={{color:'white'}}>Add</Text>
								</TouchableOpacity>
						</View>

						<Text>Managers</Text>
						<View style={{backgroundColor:'black', height:1, width:screenWidth}}></View>
						<View>
							{ this.state.managers.length === 0 
							? 
								<Text style={{color:'hotpink'}}>No manager for this event, you can add using form above</Text>
							:
							<FlatList 
								data={this.state.managers}
								keyExtractor={(item, index) => item.username}
								renderItem = {(

								({item}) => <DisplayManagers event={item} />	
								)}
							>
							</FlatList>
							}
						</View>
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
                        onPress={() => this.handleDeleteEvent()}
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
    	width:200, 
    	height:30, 
    	borderBottomWidth: 1,
    	borderTopColor:'transparent',
    	borderBottomColor:'hotpink',
    	borderStartColor:'transparent',
    	borderEndColor:'transparent',
    	borderLeftColor:'transparent',
    	borderRightColor:'transparent',
    	margin:5,
    	textAlign:'center',
    },
    addManagerButton: {
    	width: 100,
    	backgroundColor:'hotpink',
    	height: 30,
    	borderRadius: 8,
    	marginTop:10,
    	marginLeft: 20,
    	justifyContent:'center',
        alignItems: 'center',
    },
    modalStyle:{
    	borderRadius:20,
    	borderColor:'hotpink',
    	borderWidth:2,
    },
    viewinModalStyles: {
	    backgroundColor: "white",
	    margin:15,
	    borderRadius: 4,
	    height:400,
    },
    updateModalStyle:{
    	borderRadius:8,
    	borderColor:'hotpink',
    	borderWidth:2,
    }
});