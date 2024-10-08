import React, {Component} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {colors} from '../constants/Colors';
import {otpIcon} from '../assets';
import {fontFamily} from '../constants/Fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {RootState} from '../redux/store';
import {connect} from 'react-redux';

interface IForgetPassOtp {
  forgetPasswordOtp: string;
  handleNextTab: () => void;
  phone: string
}

interface IForgetPassOtpState {
  userOtp: string;
}

export class ForgetPassOtp extends Component<
  IForgetPassOtp,
  IForgetPassOtpState
> {
  constructor(props: IForgetPassOtp) {
    super(props);
    this.state = {
      userOtp: '',
    };
  }

  handleSubmit = () => {
    const {handleNextTab, forgetPasswordOtp} = this.props;
    const {userOtp} = this.state;
    // this.props.navigation.navigate()

    if (userOtp === forgetPasswordOtp) {
      Alert.alert('Otp is verified');
      handleNextTab();
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };
  render() {
    const {phone} = this.props
    console.log(phone);
    
    return (
      <View style={styles.secondaryContainer}>
        <Text style={styles.verificationText}>
          Please enter the verification code sent to +91 {phone}
        </Text>
        <View style={styles.OtpContainer}>
          <OtpInput
            numberOfDigits={4}
            focusColor={colors.light}
            focusStickBlinkingDuration={500}
            onTextChange={text => this.setState({
              userOtp: text
            })}
          />
          <View style={styles.OtpTimerContainer}>
            <ImageBackground
              resizeMode="contain"
              source={otpIcon}
              style={styles.otpBackground}>
              <Text style={styles.OtpTimerText}>23 Seconds</Text>
            </ImageBackground>
            <View>
              <Text style={styles.OtpDidntRecieveText}>
                Didn't recieve the OTP?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={this.handleSubmit}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  console.log('FORGET PASSWORD OTP---', state.AuthSlice.otp);
  return {
    forgetPasswordOtp: state.AuthSlice.otp,
    phone: state.AuthSlice.phone
  };
};

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    marginVertical: 70,
  },
  secondaryContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  verificationText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontWeight: '500',
    color: colors.grey,
  },
  OtpContainer: {
    marginVertical: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    // marginHorizontal: 5,
    width: responsiveWidth(60),
  },
  OtpTimerContainer: {
    flex: 1,
    height: responsiveHeight(100),
    // marginHorizontal: 100
  },
  OtpTimerText: {
    color: colors.white,
    fontWeight: '700',
  },
  otpBackground: {
    width: responsiveWidth(30),
    height: responsiveHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  OtpDidntRecieveText: {
    color: colors.grey,
    zIndex: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: responsiveHeight(100),
  },
  verifyBtn: {
    backgroundColor: colors.dark,
    // flex:1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 45,
    height: responsiveHeight(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: {
    textAlign: 'center',
    color: colors.white,
  },
});

export default connect(mapStateToProps)(ForgetPassOtp);
