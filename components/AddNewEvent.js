import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    TextInput, FlatList, Dimensions,
    Platform, TouchableOpacity, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//This component toggles the view that contains the inputs
import renderIf from './renderIf';
import DatePicker from 'react-native-datepicker'

import eventData from './data/FlatListData';


const screenWidth = Dimensions.get('window').width;

export default class AddNewEvent extends Component {
    constructor(props){
        super(props);
        this.state = ({
            status: false,
            newTopic: '',
            newDetails: '',
            newDate: '',
            newCountry:'',
            newCity:'',
            newInterested:'',
            newPrice:''


        });
    }
    toggleStatus(){
        this.setState({status: !this.state.status});
    }
    generateId = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters})
    }
    render(){
        return(
            
           <View style={styles.inputsView}>
                <ScrollView >
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Create An Event</Text>
                    <TextInput 
                        value={this.state.newTopic}
                        onChangeText={(text) => this.setState({newTopic: text})}
                        placeholder="event topic"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.newDetails}
                        onChangeText={(text) => this.setState({newDetails: text})}
                        placeholder="details"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                     <DatePicker
                        style={styles.inputsStyle}
                        date={this.state.newDate}
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
                            marginLeft: 36
                        }
                       
                        }}
                        onDateChange={(date) => {this.setState({newDate: date})}}
                    />
                    <TextInput 
                        value={this.state.newCountry}
                        onChangeText={(text) => this.setState({newCountry: text})}
                        placeholder="country"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput
                        value={this.state.newCity}
                        onChangeText={(text) => this.setState({newCity: text})} 
                        placeholder="city"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.newInterested}
                        onChangeText={(text) => this.setState({newInterested: text})}
                        placeholder="interested"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.newPrice}
                        onChangeText={(text) => this.setState({newPrice: text})}
                        placeholder="price"
                        keyboardType="numeric"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TouchableOpacity style={styles.addButton}
                        onPress={()=> {

                            let topic = this.state.newTopic.length;
                            let details = this.state.newDetails.length;
                            let date = this.state.newDate.length;
                            let country = this.state.newCountry.length;
                            let city = this.state.newCity.length;
                            let interested = this.state.newInterested.length;
                            let price = this.state.newPrice.length;

                            if(topic === 0 || details === 0 || date === 0 || country === 0 || city === 0 || interested === 0 || price === 0){
                                alert('Sorry all inputs are required');
                                return;
                            }
                            const newId = this.generateId(11);
                            //create a new array to start adding data
                            const newEventData = {
                                id: newId,
                                topic: this.state.newTopic,
                                details:this.state.newDetails,
                                date: this.state.newDate,
                                country: this.state.newCountry,
                                city:this.state.newCity,
                                interested: this.state.newInterested,
                                price: this.state.newPrice
                            }
                            eventData.push(newEventData);
                            //toggle view on data add
                            this.toggleStatus();
                            //clear all inputs after adding
                            this.setState({newTopic: ''});
                            this.setState({newDetails:''});
                            this.setState({newDate: ''});
                            this.setState({newCountry: ''});
                            this.setState({newCity: ''});
                            this.setState({newInterested: ''});
                            this.setState({newPrice: ''});
                            alert("successful submition")
                        }}
                        
                    >
                        <Text style={{color:'white', fontSize: 16, fontWeight:'bold'}}>Add</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View> 
            
        );
    }

}

const styles = StyleSheet.create({
    inputsView: {
        backgroundColor: 'pink',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputsStyle: {
        height: 40,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        textAlign:'center'

    },
    addButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        height: 35,
        width: 200,
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15,
        marginBottom: 15
    }
});