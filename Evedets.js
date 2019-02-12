
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    BackHandler,
    Image,
    TouchableOpacity,
    Dimensions,
    SectionList,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Picker,

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { fontSizes, colors } from './../../../../styles';
import {HOST, PROFILE_IMAGES, EVENTS_URL}  from './../../../../constant/constant';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'

import HttpRequest  from './../../../../api/HttpRequest';
// import PickerAndroid from 'react-native-picker-android';

const screenWidth = Dimensions.get('window').width;

class EventDetail extends Component {
    constructor(props) {
       super(props); 

    }
    state = {
        language: "php",
        eventDetial: "",
        procesing: '', 
        error: '',
        event: "",
        ticketPrice:"php" ,
        ticketquntity: "1",
        likes: 0,
        comments: 0,
        dislikes: 0,
        reacted: 0,
        ticketType:'',
        idEvent: '',
        bought:false,
    }

   componentWillMount = () => {
        BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
    };

    componentDidMount() {
        const body = {
            eventId:  this.props.event.idEvent,
        };
      this.setState({
          ticketPrice: this.props.event.standard,
          language: this.props.event.standard,
          likes: this.props.event.countlikes,
          dislikes: this.props.event.countdislikes,
          comments: this.props.event.countcomments,
      });
        HttpRequest.post( EVENTS_URL+'getdetails', body)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    eventDetial: responseJson,
                    event: responseJson.event,
                });

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

     like( ){
        if(this.state.reacted == 0)
            this.setState((prevState)=> ({
                likes: parseInt(prevState.likes) + reacted,
                reacted: 1
            }))
     }
     comment(){
        this.setState((prevState)=> ({
            comments: parseInt(prevState.comments) + 1
        }))
     }

     dislike(){
        this.setState((prevState)=> ({
            dislikes: parseInt(prevState.dislikes) + 1
        }))
     }
     handleBuyTicket(){
        // this.setState({ticketType: this.state.ticketType ? (this.props.event.standard) : (this.state.ticketType) ? this.props.event.vipprice : this.props.event.vvipprice)}
        const body = {
            "ticketType": this.props.event.standard,
            "number": this.state.ticketquntity,
            
        }
        HttpRequest.post(EVENTS_URL+'purchase', body)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({bought: true})
            alert(`Values are: type ${JSON.stringify(responseJson)} and id ${this.props.event.idEvent} `)
        })
        .catch((error) => {
            this.setState({procesing: false})
            console.log(`The error ${error.message} occured on buying ticket`)
        })
        
     }

    render() {
        this.state. Detial &&  console.log( "the value of comments is :"+ JSON.stringify(this.state.eventDetial.comments))
        const renderItem = ({ item, index, section: { title, data } }) => {
          return (
            <View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: "http://"+HOST+"/sayo/api/web/events/covers/"+ this.props.event.cover}}
                    />
                    <View style={styles.title}>
                        <Text > {this.props.event.title} </Text>
                        <Text style={styles.gabbage}> {this.props.event.owner.name} </Text>
                        <Text style={styles.price}> $56.00 - $130.00 </Text>
                    </View>
                    <View style={styles.eventCardFoot} >
                            <View style={styles.pullLeft}>
                              <MaterialIcons
                                name="location-on"
                                color='#808080'
                                size={15}
                                
                                />
                              <Text style={styles.location}>{this.props.event.country}, {this.props.event.location}, {this.props.event.venue}, </Text>
                             </View>
                             <View style={styles.pullRight}>
                                  <MaterialIcons
                                    name="timer"
                                    color='#808080'
                                    size={15}
                                    
                                    />
                                  <Text style={styles.location}>{this.props.event.eventDate}</Text>
                            </View>
                      </View>
                </View>
                <View style={styles.eventsContainer}>
                    
                      <Text> Estimated Population: {this.props.event.expop ? this.props.event.expop : 120 }</Text>


                    <View>
                        <Text style={styles.descriptionStyle} >
                            {this.props.event.details}
                        </Text>

                        <Text style={styles.price}> Price: $${this.state.language * parseInt(this.state.ticketquntity)} </Text>
                        
                        <Text style={styles.gabbage}> {this.props.event.eventtype} </Text>

                    </View>
                    <View><Text>Selecet Ticket Type</Text></View>
                    <View style={styles.cartSection}>

                          <Picker
                              selectedValue={this.state.language}
                              style={{ marginLeft:50, height: 50, width: 100 }}
                              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>

                              <Picker.Item label="Standard" value={this.props.event.standard} />
                              
                                <Picker.Item label="Silver" value={this.props.event.vipprice} />
                               
                                
                              <Picker.Item label="Gold" value={this.props.event.vvipprice} />
                              
                                
                             
                
                            </Picker>


                        <View>
                        <View style={styles.cart}>
                            <TouchableOpacity onPress={() => this.setState((prevState)=> ({
                                ticketquntity: (parseInt(prevState.ticketquntity) - 1)+''
                            }))} >
                                <View style={styles.buttonSmall}>
                                    <Text style={styles.text}>-</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState((prevState)=> ({
                                ticketquntity: (parseInt(prevState.ticketquntity) + 1)+''
                            }))}>
                                <View style={styles.buttonSmall}>
                                    <Text style={styles.text}>+</Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                            <TextInput style={styles.button}
                                underlineColorAndroid="transparent"
                                value={this.state.ticketquntity}
                                onChangeText={(ticketquntity) => {
                                    // let intQuantity = isNaN(ticketquntity)? 0: parseInt(ticketquntity);
                                    this.setState({ ticketquntity })
                                } 
                                }
                                placeholderTextColor="#808080"
                            />
                            <TouchableOpacity 
                                onPress={() => this.handleBuyTicket()}
                            >
                                <View style={styles.button}>
                                    <Text style={styles.text}>BUY</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.juiceSection}>
                        <View style={styles.juice} >
                            <TouchableOpacity onPress={() => this.comment()}>
                                <Text style={styles.reaction} >
                                    <FontAwesome name="comments-o"  size={25}  color={colors.secondaryColor}  />
                                       
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.reactionValue}>{this.state.comments}</Text>
                        </View>

                        <View style={styles.juice}>
                            <TouchableOpacity onPress={() => this.like()} >
                                <Text style={styles.reaction}> 
                                   
                                    <FontAwesome name="thumbs-o-up"  size={25} color={colors.secondaryColor}  />
                                       
                                </Text>
                            </TouchableOpacity>
                             <Text style={styles.reactionValue}> {this.state.likes}</Text>
                        </View>

                        <View style={styles.juice}>
                             <TouchableOpacity onPress={() => this.dislike()}>
                                <Text style={styles.reaction}>
                                  
                                    <FontAwesome name="thumbs-o-down"  size={25}  color={colors.secondaryColor}  />
                                       
                                </Text>
                             </TouchableOpacity>
                            <Text style={styles.reactionValue}> {this.state.dislikes}</Text>
                        </View>
                 </View>



            </View>
          );
        }

        const renderItemHack = ({ item, index, section: { title, data } }) => {
          return (
                <View> <Text> No comments  </Text> </View> 
            )}


        return (
            <View style={styles.container}>
                <SectionList
                    stickySectionHeadersEnabled={true}
                    renderItem={({item, index, section}) => <Comments comment = {item} />}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    sections={[
                        {title: '', data: ["hello"], renderItem: renderItem},
                        // {title: 'Trending Music', data: [this.props.songs], renderItem: overrideRenderItem },
                       this.state.eventDetial.comments ?
                            {title: 'Comments', data:  this.state.eventDetial.comments  } : {title: 'Comments', data:  "", renderItem: renderItemHack }
                    ]}
                    keyExtractor={(item, index) => item + index}
                />

             </View>
        )
    }
}

export default EventDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        elevation: 10,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#696969',
        shadowOffset: { width: 3, height: 10 },
        shadowOpacity: 0.4,

    },
    descriptionStyle: {
        fontSize: 14,
        fontWeight: '100',
        paddingHorizontal: 5,
        marginBottom: 10,
        textAlign: 'justify',
        marginTop: 10,
    },
    imageStyle: {
        height: 180,
        marginRight: 10,
        paddingRight: 10,
        width: screenWidth - 10,
    },

    eventsContainer: {
        flex: 1,

    },
    imageContainer: {
        marginTop: 2,
        marginBottom: 10,
        marginRight: 5,
        borderRadius:10,
        backgroundColor: '#E5F7F0', 
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#696969',
        shadowOffset: { width: 3, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 7,
        elevation: 22,
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        height:270,
        width:screenWidth -30,
    },
    title: {
        alignItems: 'flex-start',
    },
    price: {
        marginLeft: 10,
        marginTop: 5,
        color: colors.primaryColor,
        fontWeight: "500"

    },
    button: {
        backgroundColor: 'white',
        marginVertical: 10,
        height: 40,
        borderWidth: 1,
        borderColor: colors.primaryColor,
        paddingHorizontal: 30,
        paddingVertical: 10,
        //margin: 25,
        marginTop: 15,
        marginBottom: 10,
        marginRight: 10,
        marginLeft:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    buttonSmall: {
        backgroundColor: 'white',
        marginVertical: 5,
        height: 20,
        borderWidth: 1,
        borderColor: colors.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 5,
        //margin: 25,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        marginLeft:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    mainButton: {
        marginRight: 30,
        paddingRight: 20,
    },
    text: {
        fontWeight: 'bold',
       // fontFamily: 'Avenir'
        alignItems: 'flex-start',
        color: colors.primaryColor,
    },
    gabbage: {
        fontSize: 10,
        marginLeft: 10,
        marginTop: 2,
    },
    cartSection: {
        flex: 1,
        flexDirection: 'row',
    },
    cart:{
        marginTop: 30,
        flex: 1,
        marginRight: 5,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    play: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 10,

        borderColor: "white",
        position: 'absolute',
        marginLeft: 60,
        zIndex:80
      },
    pullRight: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: 'row',
    },
    pullLeft: {
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    location:{
        fontSize: 8,
        fontWeight:'100',
        paddingRight: 10,
    },
    eventCardFoot: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 10,
        marginTop: 5,
        justifyContent: "space-between",
        alignItems: "stretch",

    },

        postCaption: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: "white",
            // justifyContent: "space-between",
            alignItems: "center",
            // margin: 10,
            // marginBottom: 0,
            padding: 10,
            shadowColor: '#696969',
            shadowOffset: { width: 3, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 7,
            elevation: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderRadius: 15,
            alignSelf: 'stretch',
            justifyContent: 'center'
        },

        profilePic: {
            width: 50,
            height: 50,
            //marginRight: 10,
            borderRadius: 25,
        },

        postCaptionText: {
            color: '#808080',
            fontWeight: 'normal',
            fontSize: fontSizes.big,
                    //marginRight: 10,
        },
        commentContent: {
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between'
        },

        reaction: {
            flexDirection: 'row',
            paddingRight: 2,
        },
        reactionValue: {
            paddingRight: 10,
            paddingTop: 10,
            fontSize: 12,

        },
        juice: {
            marginRight: 10,
            flexDirection: 'row',
        },
        juiceSection: {
            flexDirection: 'row',
            flex: 1, 
            justifyContent: 'center', 
            paddingTop: 10,
            backgroundColor: colors.primaryColor,
        },

    });


class Comments extends React.Component{

    render() {
        return (
                <View>
                    <View style={styles.postCaption}>
                        <Image
                            style={styles.profilePic}
                            source={{uri: PROFILE_IMAGES+ this.props.comment.commenter.profile_pic}}
                        />
                        <View style={styles.commentContent}>
                             <Text style={{ paddingBottom: 5,}}> {this.props.comment.commenter.username} </Text>
                            <View style={{ flexDirection: 'row'}} >
                                <Text style={styles.postCaptionText}>{this.props.comment.commentdetails}</Text>
                                <MaterialIcons
                                    name="add-a-photo"
                                    color={colors.primaryColor}
                                    size={25}
                                    style={styles.postCaptionIcon}
                                />
                            </View>
                        </View>
                    </View>
                </View>
        );
    }
}






