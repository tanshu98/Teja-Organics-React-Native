import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Screens/HomeScreen';
import Cart from '../Screens/Cart';
import Category from '../Screens/Category';
import Profile from '../Screens/Profile';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/Colors';
import BottomBarHome from 'react-native-vector-icons/Foundation';
import BagIcon from 'react-native-vector-icons/Ionicons';
import GridIcon from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

class BottomTabNavigation extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false, tabBarStyle: styles.navigatorOptions
      }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({size, color, focused }) => { 
              return focused ? (
                <View style={styles.eachTabStyleFocused}>
                  <BottomBarHome name="home" size={size} color={colors.white} />
                  <Text style={styles.eachTabHeaderFocused}>Home</Text>

                </View>
              ) : (
                <BottomBarHome name="home" size={size} color={colors.grey} />
              );
            },
          }}>
          {props => <Home {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Cart"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ size, color, focused }) => {
              return focused ? (
                <View style={styles.eachTabStyleFocused}>
                  <BagIcon name="bag" size={size} color={colors.white} />
                  <Text style={styles.eachTabHeaderFocused}>Cart</Text>
                </View>
              ) : (
                <BagIcon name="bag" size={size} color={color} />
              );
            },
          }}>
          {props => <Cart {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Category"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({size, color, focused }) => {
              return focused ? (
                <View style={styles.eachTabStyleFocused}>
                  <GridIcon name="grid" size={size} color={colors.white} />
                  <Text style={styles.eachTabHeaderFocused}>Category</Text>
                </View>
              ) : (
                <GridIcon name="grid" size={size} color={color} />
              );
            },
          }}>
          {props => <Category {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({size, color, focused }) => {
              return focused ? (
                <View style={styles.eachTabStyleFocused}>
                  <BagIcon name="person" size={size} color={colors.white} />
                  <Text style={styles.eachTabHeaderFocused}>Profile</Text>
                </View>
              ) : (
                <BagIcon name="person" size={size} color={color} />
              );
            },
          }}>
          {props => <Profile {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  eachTabStyleFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 50,
    width: 110,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'space-around',
  },
  eachTabHeaderFocused: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17.7,
  },
  navigatorOptions: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    height: Platform.OS === 'ios' ? 100 : 70,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default BottomTabNavigation;
