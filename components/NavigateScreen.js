import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'

import EventDashboard from './EventDashboard'
import EventView from './EventView'

export default class NavigateScreen extends Component {
  render() {
    return (
      <Swiper

        loop={false}
        showsPagination={false}
        index={1}>

        <View style={styles.container}>
          <EventDashboard />
        </View>

        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={1}>

          <View style={styles.container}>
            <EventView  />
          </View>

          <View style={styles.container}>
            <EventView  />
          </View>

        </Swiper>  

      </Swiper>
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
})