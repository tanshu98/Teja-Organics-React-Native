import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
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
        <NotificationIcon
            name="notifications-outline"
            size={24}
            color={colors.grey}
            style={styles.Notificationicon}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    // marginHorizontal: 20,
    width: responsiveWidth(100),
    gap:20,
    textAlign: 'center'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'space-between',
    elevation: 0,
    color: colors.grey
  },
  inputField: {
    // flex: 1,
    marginLeft: 10,
    backgroundColor: colors.white,
    height: responsiveHeight(6),
    width: responsiveWidth(30),
    borderRadius: 64,
    fontFamily: fontFamily.sfProDisplayRegular

  },
  icon: {
    marginHorizontal: 15,
  },
  Notificationicon:{
    borderRadius:20
  }
});

export default HeaderComponent;
