import React, { Component } from 'react';
import { 
    View, Text, Alert,
    StyleSheet, BackHandler,
    Image, TouchableOpacity,
    FlatList, TextInput,AsyncStorage,
    ScrollView, KeyboardAvoidingView,Modal,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker'

import { EVENTS_URL }  from './../../../constant/constant';
import HttpRequest from './../../../api/HttpRequest';
import ModalHeader from "./../../commons/ModalHeader";
import { MaterialIcons, MaterialCommunityIcons, Feather, EvilIcons } from '@expo/vector-icons';

// const options = {
//   title: 'Select Photo',
//   takePhotoButtonTitle:'Take Live Picture',
//   chooseFromLibraryButtonTitle:'Choose From Gallery',
//   quality:1
  
// };


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
            // organizer: '',
            coverSource:null,
            standard: '', //standardPrice
            vipprice: '',
            vvipprice: '',
            vvvipprice: '',
            others: '',
            sponsor: '',
            processing: false,
            filesModalVisible: false,
            attachments: [],
            
        }
    } 
    justAnAlert(){
        alert('Thank God it works');
        console.log("I doubt if this alert is actually rendered")
    }
    componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
    };
    clearInputs(){
        this.setState({
            title: '', details: '', eventDate: '', country: '', city: '', venue: '',
            expop: '', eventtype: '', standard: '', sponsor: '', others: '',
            vipprice: '', vvipprice: '', vvvipprice: '',discount: '',  
        })
    }

    setFilesModalVisible(visible) {
      this.setState({filesModalVisible: visible});
    }
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        mediaTypes: "All",
        quality: 0.5,
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ attachments: result });
      }
    };

    _pickLiveImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        mediaTypes: "All",
        quality: 0.5,
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ attachments: result });
      }
    };

    componentDidMount() {
    };
    confirmAddEvent(){
        let ti = this.state.title.length, det=this.state.details.length, co=this.state.country.length;
        let cit = this.state.city.length, ven=this.state.venue.length, pop=this.state.expop.length;
        let stan=this.state.standard.length, vip=this.state.vipprice.length, vvip = this.state.vvipprice.length;
        let evt=this.state.eventtype.length, evd=this.state.eventDate.length,vvvip=this.state.vvvipprice.length; 
        let spon=this.state.sponsor.length, oth = this.state.others.length;

        if (ti === 0 || det === 0 || co === 0 || cit === 0 || ven === 0 || pop === 0 || stan === 0 ||
         vip === 0 || vvip === 0 || vvvip === 0 || evt === 0 || evd === 0 || spon === 0 || oth === 0 ) {
            alert('Sorry all input required');
            return;
        }
        this.setState({processing: !this.state.processing})
        const body = {
            "title":      this.state.title,
            "details":    this.state.details,
            "country":    this.state.country,
            "city":       this.state.city,
            "venue":      this.state.venue,
            "expop":      this.state.expop,
            "standard":   this.state.standard,
            "vipprice":   this.state.vipprice,
            "vvipprice":  this.state.vvipprice,
            "vvvipprice": this.state.vvvipprice,
            "discount":   this.state.discount,
            "eventtype":  this.state.eventtype,
            "eventDate":  this.state.eventDate,
            "sponsor":    this.state.sponsor,
            "others":     this.state.others,
            "cover":      this.state.coverSource,
          
            // "organizer":  this.state.organizer,
            //"urlname": this.state.urlname,
            
            
        };
        HttpRequest.post(EVENTS_URL+'createevent', body)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    processing:false,
                })
                console.log('event created is'+ JSON.stringify(responseJson))
                console.log(`body data is:  ${body}`)
                alert('Event Added Successfully')//alert(JSON.stringify(responseJson))
                this.clearInputs()
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
            <ScrollView>
            <View style={styles.container}>
                <View>

                    <Modal
                        animationType="slide"
                        presentationStyle="pageSheet"
                        transparent={false}
                        visible={this.state.filesModalVisible}
                        onRequestClose={() => {
                          this.setFilesModalVisible(false);
                        }}>
                        <View style={styles.modalContent}>
                          <ModalHeader onCancelFxn={() => {this.setFilesModalVisible(!this.state.filesModalVisible)}}
                            onSubmitFxn={() => {this.setFilesModalVisible(!this.state.filesModalVisible)}}
                            title="Add Event Cover" />
                              <View style={styles.btnContainer}>
                                  <View style={[styles.uploadBtn, {marginTop: 30}]}>
                                    <TouchableOpacity
                                        onPress={() => this._pickImage}
                                        style={styles.addButton}
                                    >
                                        <Text style={{color:'white', fontSize:16}}>Select from gallery</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <View style={[styles.uploadBtn, {marginBottom: 20}]}>
                                  <TouchableOpacity
                                        onPress={() => this._pickLiveImage}
                                        style={styles.addButton}
                                    >
                                        <Text style={{color:'white', fontSize:16}}>Take a live picture</Text>
                                    </TouchableOpacity>
                                  </View>
                              </View>
                              <View style={{padding: 5, paddingBottom: 15, paddingLeft: 10, paddingRight: 10}}>
                                    { this.state.attachments ?
                                      <View style={{'flex': 1, 'flexDirection': "row"}}>
                                        { this.state.attachments.type == "image" ?
                                          <Image source={{ uri: this.state.attachments.uri }}
                                            style={{ width: 75, height: 75, borderRadius: 5, marginRight: 5, marginBottom: 5 }}
                                            />
                                          :
                                          <Text>Video dedicated!! adding video player soon</Text>
                                        }
                                      </View>
                                      :
                                      <View style={{'flex': 1, 'flexDirection': "row"}}>
                                        <EvilIcons
                                          name="image"
                                          color='#808080'
                                          size={120}
                                          />
                                          <Feather
                                              name="video"
                                              color='#808080'
                                              size={100}
                                            />
                                      </View>
                                    }
                              </View>
                              <View style={[styles.btnView, {marginBottom: 50}]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setFilesModalVisible(!this.state.filesModalVisible);
                                        }}
                                        style={styles.addButton}
                                    >
                                        <Text style={{color:'white', fontSize:16}}>DONE</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                      </Modal>


                </View>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Title"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.title}
                    onChangeText={(title) => this.setState({ title })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Details"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.details}
                    onChangeText={(details) => this.setState({ details })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Country"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.country}
                    onChangeText={(country) => this.setState({ country })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="City"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city })}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Venue"
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
                    placeholder="discount"
                    returnKeyType='next'
                    keyboardType='numeric'
                    underlineColorAndroid="transparent"
                    value={this.state.discount}
                    onChangeText={(discount)=>this.setState({ discount })}
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
                    placeholder="sponsor"
                    returnKeyType='next'
                    keyboardType='default'
                    underlineColorAndroid="transparent"
                    value={this.state.sponsor}
                    onChangeText={(sponsor)=>this.setState({ sponsor })}
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

                <TouchableOpacity
                    onPress={() => {
                      this.setFilesModalVisible(true);
                    }}
                      style={styles.inputStyle}
                    >
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <MaterialIcons
                        name="add-a-photo"
                        color="hotpink"
                        size={20}
                        // style={styles.postCaptionIcon}
                        />
                      <Text style={{color:'grey'}}>Add Event cover</Text>
                    </View>
                  </TouchableOpacity>
                
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
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        height:50,
        borderColor: 'grey'
    },
    coverButtonStyle:{
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        borderColor:'grey',
        borderWidth:2,
        margin: 8,
        justifyContent:'center',
        alignItems: 'center',
        height: 50,

    },
    addButton: {
        backgroundColor: 'hotpink',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        margin: 8,
        justifyContent:'center',
        alignItems: 'center',
        height: 50,
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