import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from '../Screens/HomeScreen';
import Cart from '../Screens/Cart';
import Category from '../Screens/Category'
import Profile from '../Screens/Profile'

const Tab = createMaterialBottomTabNavigator();

class BottomTabNavigation extends Component {
  render() {
    return (
      <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Profile"  >
          {props=><Profile {...props}/>}
        </Tab.Screen>

      </Tab.Navigator>
    );
  }
}

export default BottomTabNavigation;
