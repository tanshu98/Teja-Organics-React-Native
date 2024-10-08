import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { otpIcon } from '../assets';
import { fontFamily } from '../constants/Fonts';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';

interface IOtpProps {
  navigation: any;
  otp: string;
  phone: string;
}

interface IOtpState {
  userOtp: string;
  timer: number;
}

export class Otp extends Component<IOtpProps, IOtpState> {
  intervalId: NodeJS.Timeout | null = null; // To store the interval ID
  constructor(props: IOtpProps) {
    super(props);
    this.state = {
      userOtp: '',
      timer: 60,
    };
  }

  handleSubmit = () => {
    const { userOtp } = this.state;
    const { otp, navigation, phone } = this.props;

    if (userOtp.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please enter the OTP 🙂',
      });
    } else if (userOtp === otp) {
      Toast.show({
        type: 'success',
        text1: 'Congratulations🤩 You have successfully Signed up🥰 ',
      });
      navigation.navigate('loginSignupScreen');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP. Please try again 😕',
      });
    }
  };

  componentDidMount(): void {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        // Ensure prevState.timer is always greater than 0 before decrementing
        if (prevState.timer <= 1) {
          clearInterval(this.intervalId!);
          return { timer: 0 };
        }
        return { timer: prevState.timer - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleOtpChange = (text: string) => {
    this.setState({ userOtp: text });
  };

  render() {
    const { phone } = this.props;
    const { timer } = this.state;

    return (
      <SafeAreaView style={styles.primaryContainer}>
        <View style={styles.secondaryContainer}>
          <Text style={styles.verificationText}>
            Please enter the verification code sent to +91 {phone}
          </Text>
          <View style={styles.OtpContainer}>
            <OtpInput
              numberOfDigits={4}
              focusColor={colors.light}
              focusStickBlinkingDuration={500}
              onTextChange={this.handleOtpChange}
            />
            <View style={styles.OtpTimerContainer}>
              <ImageBackground
                resizeMode="contain"
                source={otpIcon}
                style={styles.otpBackground}>
                <Text style={styles.OtpTimerText}>{timer} Seconds</Text>
              </ImageBackground>
              <View>
                <Text style={styles.OtpDidntRecieveText}>
                  Didn't receive the OTP?
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.verifyBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={this.handleSubmit}>
                <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// Map OTP from Redux state
const mapStateToProps = (state: RootState) => {
  return {
    otp: state.AuthSlice.otp,
    phone: state.AuthSlice.phone,
  };
};

export default connect(mapStateToProps)(Otp);

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
    marginVertical: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginHorizontal: 50,
  },
  OtpTimerContainer: {
    flex: 1,
    height: responsiveHeight(100),
    marginLeft: 20,
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
    marginLeft: 20,
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
    padding: 10,
    borderRadius: 10,
    marginVertical: 35,
    height: responsiveHeight(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  verifyText: {
    textAlign: 'center',
    color: colors.white,
  },
});
