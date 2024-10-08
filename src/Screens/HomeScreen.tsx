import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import { Text } from 'react-native-paper'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { colors } from '../constants/Colors'
import HeaderComponent from '../components/HeaderComponent'
import HomeCarousal from '../components/HomeCarousal'
import BestSeller from '../components/BestSeller'
import HomeFlatlistItem from '../components/HomeFlatlistItem'
import HomeScreenProducts from '../components/HomeScreenProducts'

interface IProps {
  navigation: any;
  route: any
}

export class HomeScreen extends Component<IProps> {
  render() {
    return (
      <SafeAreaView>
      <ScrollView
      style={{
        minHeight: responsiveScreenHeight(100),
        backgroundColor: colors.signupBg,
      }}>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <HeaderComponent  />
      {/* <HomeCarousal /> */}
      {/* <BestSeller /> */}
      {/* <HomeFlatlistItem /> */}
      {/* <HomeScreenProducts /> */}
    </ScrollView>
    </SafeAreaView>
    )
  }
}

export default HomeScreen
