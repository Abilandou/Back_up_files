
import React, { Component } from 'react';
import { 
    View, Text, Alert,
    StyleSheet, BackHandler,
    Image, TouchableOpacity,
    FlatList, TextInput,
    ScrollView, KeyboardAvoidingView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'

import { EVENTS_URL }  from './../../../constant/constant';
import HttpRequest from './../../../api/HttpRequest';

class EventDashboard extends Component { 
    constructor(props){
        super(props)

        this.state = {
            title: '',
            details: '',
            eventDate: '',
            country: '',
            city: '',
            venue: '',
            expop: '',
            eventtype: '',
            discount: '',
            organizer: '',
            standard: '', //standardPrice
            vipprice: '',
            vvipprice: '',
            vvvipprice: '',
            others: '',
            sponsor: '',
            processing: false,
            
        }
    } 

    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
    };
    clearInputs(){
        this.setState({
            title: '', details: '', eventDate: '', country: '', city: '', venue: '',
            expop: '', eventtype: '', discount: '', organizer: '', standard: '',
            vipprice: '', vvipprice: '', vvvipprice: '', others: '', sponsor: '', 
        })
    }

    componentDidMount() {
    };
    confirmAddEvent(){
        this.setState({processing: !this.state.processing})
        const body = JSON.stringify({
            "title":      this.state.title,
            "details":    this.state.details,
            "eventDate":  this.state.eventDate,
            "country":    this.state.country,
            "city":       this.state.city,
            "venue":      this.state.venue,
            "expop":      this.state.expop,
            "eventtype":  this.state.eventtype,
            "discount":   this.state.discount,
            "organizer":  this.state.organizer,
            "standard":   this.state.standard,
            "vipprice":   this.state.vipprice,
            "vvipprice":  this.state.vvipprice,
            "vvvipprice": this.state.vvvipprice,
            "others":     this.state.others,
            "sponsor":    this.state.sponsor,
            //"urlname": this.state.urlname,
            //"coverArt": this.state.coverArt,
            
        })
        HttpRequest.post(EVENTS_URL+'createevent', body)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    processing:false,
                })
                console.log('event created is'+ JSON.stringify(responseJson))
                console.log(`body data is:  ${body}`)
                alert(JSON.stringify(responseJson))
                //this.clearInputs()
            })
            .catch((error) => {
                this.setState({processing: false})
                console.error(`You have the error: ${error.message}`)

                 Alert.alert('error creating event')

            })

    }
    render() {
     return (
      
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="padding" enabled
            keyboardVerticalOffset={65}
            >
            <ScrollView 
            >
            <View style={styles.container}>
            

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Title"
                    returnKeyType='next'
                    multiline={true}
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.title}
                    onChangeText={(title) => this.setState({ title })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Details"
                    multiline={true}
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.details}
                    onChangeText={(details) => this.setState({ details })}
                />
                <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.eventDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2019-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 10,

                      }
                    }}
                    onDateChange={(eventDate) => {this.setState({eventDate: eventDate})}}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Country"
                    multiline={true}
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.country}
                    onChangeText={(country) => this.setState({ country })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="City"
                    multiline={true}
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Venue"
                    multiline={true}
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.venue}
                    onChangeText={(venue) => this.setState({ venue })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Expected Population"
                    returnKeyType='next'
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={this.state.expop}
                    onChangeText={(expop) => this.setState({ expop })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="event type"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.eventtype}
                    onChangeText={(eventtype) => this.setState({ eventtype })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="discount"
                    underlineColorAndroid="transparent"
                    returnKeyType='next'
                    keyboardType='numeric'
                    value={this.state.discount}
                    onChangeText={(discount) => this.setState({ discount })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="organizer"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.organizer}
                    onChangeText={(organizer) => this.setState({ organizer })}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder="standard price"
                    returnKeyType='next'
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={this.state.price}
                    onChangeText={(standard)=>this.setState({ standard })}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder="vipprice"
                    returnKeyType='next'
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={this.state.vipprice}
                    onChangeText={(vipprice)=>this.setState({ vipprice })}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder="vvipprice"
                    returnKeyType='next'
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={this.state.vvipprice}
                    onChangeText={(vvipprice)=>this.setState({ vvipprice })}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder="vvvipprice"
                    returnKeyType='next'
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={this.state.vvvipprice}
                    onChangeText={(vvvipprice)=>this.setState({ vvvipprice })}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder="others"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.others}
                    onChangeText={(others)=>this.setState({ others })}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder="sponsor"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.sponsor}
                    onChangeText={(sponsor)=>this.setState({ sponsor })}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={()=> this.confirmAddEvent()}
                >
                    <Text style={{ color:'white', fontSize: 16, fontWeight:'bold' }}>Add Event</Text>
                </TouchableOpacity>
                
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
        
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF6F7',
    },

    inputStyle: {
        flex: 1,
        margin: 8,
        paddingLeft: 10,
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        height:50,
        borderColor: 'grey'
    },
    addButton: {
        backgroundColor: 'hotpink',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        margin: 8,
        justifyContent:'center',
        alignItems: 'center',
        height: 50
    },
    datePickerStyle: {
        flex: 1,
        width: 342, 
        borderWidth:1, 
        borderRadius:8, 
        margin: 8,
        height: 50,
    }

});
export default EventDashboard;
