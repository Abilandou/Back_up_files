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
import DatePicker from 'react-native-date-picker';

const screenWidth = Dimensions.get('window').width;

export default class AddNewEvent extends Component {
    constructor(props){
        super(props);
        this.state = ({
            status: false,
            id:'',
            topic: '',
            details: '',
            date: '',
            country:'',
            city:'',
            interested:'',
            price:''
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
                    <TextInput 
                        value={this.state. Topic}
                        onChangeText={(text) => this.setState({ Topic: text})}
                        placeholder="event topic"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.Details}
                        onChangeText={(text) => this.setState({Details: text})}
                        placeholder="details"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.Date}
                        onChangeText={(text) => this.setState({Date: text})}
                        placeholder="date"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    {/* <DatePicker 
                        date={this.state.Date}
                        onDateChange={(date => this.setState({Date: date}))}
                        placeholder="select date"
                        style={styles.inputsStyle}
                    /> */}
                    <TextInput 
                        value={this.state.Country}
                        onChangeText={(text) => this.setState({Country: text})}
                        placeholder="country"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput
                        value={this.state.City}
                        onChangeText={(text) => this.setState({City: text})} 
                        placeholder="city"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.Interested}
                        onChangeText={(text) => this.setState({Interested: text})}
                        placeholder="interested"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TextInput 
                        value={this.state.Price}
                        onChangeText={(text) => this.setState({Price: text})}
                        placeholder="price"
                        placeholderTextColor="grey"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        style={styles.inputsStyle}
                    />
                    <TouchableOpacity style={styles.addButton}
                        onPress={()=> {

                            let topic = this.state.Topic.length;
                            let details = this.state.Details.length;
                            let date = this.state.Date.length;
                            let country = this.state.Country.length;
                            let city = this.state.City.length;
                            let interested = this.state.Interested.length;
                            let price = this.state.Price.length;

                            if(topic === 0 || details === 0 || date === 0 || country === 0 || city === 0 || interested === 0 || price === 0){
                                alert('Sorry all inputs are required');
                                return;
                            }
                            //find a particular index to edit
                            const foundIndex = eventData.findIndex(item => this.state.id == item.id);
                            if(foundIndex.length < 0){
                                return;
                            }


                            //toggle view on data add
                            this.toggleStatus();
                            //clear all inputs after adding
                            this.setState({Topic: ''});
                            this.setState({Details:''});
                            this.setState({Date: ''});
                            this.setState({Country: ''});
                            this.setState({City: ''});
                            this.setState({Interested: ''});
                            this.setState({Price: ''});
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
        textAlign: 'center'

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