import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Platform,
} from 'react-native';
import Login from './Login';
import Signup from './Signup';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {splashBg} from '../assets';
import {colors} from '../constants/Colors';
import KeyboardWrapper from '../components/KeyboardWrapper';

interface LoginSignupScreenState {
  isActive: boolean;
  platformIOS: boolean;
}
interface LoginSignupScreenProps {
  navigation: any
}

export class LoginSignupScreen extends Component<LoginSignupScreenProps, LoginSignupScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isActive: false,
      platformIOS: false,
    };
  }

  toggleActiveState = () => {
    console.log('toggle btn pressed');
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
    console.log('isActive----', this.state.isActive);
  };


  componentDidMount(): void {
    if (Platform.OS === 'ios') {
      this.setState({
        platformIOS: true,
      });
    }
  }

  render() {
    const {isActive, platformIOS} = this.state;

    return (
      <KeyboardWrapper>
        <View
          style={[
            platformIOS ? styles.mainContainerIOS : styles.mainContainerAndroid,
          ]}>
          {isActive ? (
            <View style={[styles.signupBackground]}>
              <SafeAreaView>
                <View style={styles.tabView}>
                  <TouchableOpacity
                    style={[
                      styles.signInBtn,
                      !isActive ? styles.activeBtn : styles.inActiveBtn,
                    ]}
                    onPress={this.toggleActiveState}>
                    <Text
                      style={
                        !isActive ? styles.activeText : styles.inActiveText
                      }>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.loginBtn,
                      isActive ? styles.activeBtn : styles.inActiveBtn,
                    ]}
                    onPress={this.toggleActiveState}>
                    <Text
                      style={
                        isActive ? styles.activeText : styles.inActiveText
                      }>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
                <Signup navigation={this.props.navigation} />
              </SafeAreaView>
            </View>
          ) : (
            <ImageBackground
              source={splashBg}
              resizeMode="cover"
              style={styles.loginBackgroundContainer}>
              <SafeAreaView>
                <View style={styles.tabView}>
                  <TouchableOpacity
                    style={[
                      styles.signInBtn,
                      !isActive ? styles.activeBtn : styles.inActiveBtn,
                    ]}
                    onPress={this.toggleActiveState}>
                    <Text
                      style={
                        !isActive ? styles.activeText : styles.inActiveText
                      }>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.loginBtn,
                      isActive ? styles.activeBtn : styles.inActiveBtn,
                    ]}
                    onPress={this.toggleActiveState}>
                    <Text
                      style={
                        isActive ? styles.activeText : styles.inActiveText
                      }>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
              <Login navigation={this.props.navigation} />
            </ImageBackground>
          )}
        </View>
      </KeyboardWrapper>
    );
  }
}

const styles = StyleSheet.create({
  loginBackgroundContainer: {
    flex: 1,
    backgroundColor: colors.light,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  signupBackground: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: colors.signupBg,
  },
  mainContainerAndroid: {
    flex: 1,
  },
  mainContainerIOS: {
    flex: 1,
    // paddingVertical:20
    // paddingTop:100
  },
  tabView: {
    backgroundColor: '#32373C',
    flexDirection: 'row',
    height: responsiveHeight(6),
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signInBtn: {
    // marginHorizontal: 10,
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 70,
    marginHorizontal: 5,
  },
  loginBtn: {
    // marginHorizontal: 10,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginHorizontal: 5,
  },
  loginSafeAreaContainer: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  activeBtn: {
    backgroundColor: '#fff',
  },
  inActiveBtn: {
    backgroundColor: '#32373C',
  },
  activeText: {
    color: '#3F4343',
  },
  inActiveText: {
    color: '#fff',
  },
});

export default LoginSignupScreen;
