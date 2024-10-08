import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Platform} from 'react-native';
import {userProfile} from '../assets';
import {colors} from '../constants/Colors';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import NotificationIcon from 'react-native-vector-icons/Ionicons';

import { fontFamily } from '../constants/Fonts';

interface IHeaderComponentProps {
  // navigation: any
}

interface HeaderComponentState {
  searchProducts: string;
}

export class HeaderComponent extends Component<
  IHeaderComponentProps,
  HeaderComponentState
> {
  constructor(props: IHeaderComponentProps) {
    super(props);
    this.state = {
      searchProducts: '',
    };
  }

  handleChange = (text: string) => {
    this.setState({
        searchProducts: text
    })
  };
  render() {
    const {searchProducts} = this.state;
    return (
      <View style={styles.mainContainer}>
        <Image source={userProfile} />
        <View style={styles.inputWrapper}>
          <SearchIcon
            name="search1"
            size={24}
            color={colors.grey}
            style={styles.icon}
          />
          <TextInput
            value={searchProducts}
            onChangeText={this.handleChange}
            style={styles.inputField}
            placeholder="Search products"
          />
          
        </View>
        <View style={styles.NotificationiconContainer}>
        <NotificationIcon
            name="notifications-outline"
            size={24}
            color={colors.grey}
            style={styles.Notificationicon}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width: responsiveWidth(100),
    gap:20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    justifyContent: 'space-between',
    color: colors.grey
  },
  inputField: {
    // flex: 1,
    marginLeft: 10,
    backgroundColor: colors.white,
    height: responsiveHeight(6),
    width: responsiveWidth(40),
    borderRadius: 64,
    fontFamily: fontFamily.sfProDisplayRegular

  },
  icon: {
    marginHorizontal: 15,
  },
  NotificationiconContainer:{
    backgroundColor: colors.white,
    borderRadius: 70,
  },
  Notificationicon:{
    padding: 10,  
  }
});

export default HeaderComponent;
