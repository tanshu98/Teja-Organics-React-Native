import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { fontFamily } from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { colors } from '../constants/Colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  forgotPassword,
  getOtp,
  getPhoneOrEmail,
  IForgotPassword,
} from '../redux/slices/AuthSlice';
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';

interface IForgetPasswordProps {
  getOtp: (otp: string)=> void;
  handleNextTab:()=>void
}

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

class ForgetPassword extends Component<IForgetPasswordProps, { email: string },IForgotPassword> {
  constructor(props: IForgetPasswordProps) {
    super(props);
    this.state = {
      email: '',
    };
  }

  generateOtp = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  handleOtpSubmit = (values: { email: string }) => {
    const { getOtp, handleNextTab } = this.props;
    console.log('Email submitted:', values.email);
    const otp = this.generateOtp();
    getOtp(otp);
    console.log('OTP Generated---FORGET PASSWORD', `OTP: ${otp}`);
    handleNextTab()
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgetPasswordSchema}
        onSubmit={(values) => this.handleOtpSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.mainContainer}>
            <Text style={styles.forgotPassText}>Forgot Password</Text>
            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>Phone No or email address</Text>
              <TextInput
                value={values.email.toLowerCase()}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                style={styles.inputField}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TouchableOpacity
                style={styles.getOtpBtn}
                onPress={handleSubmit as any} 
              >
                <Text style={styles.getOtpBtnText}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  signupData: state.AuthSlice.phoneOrEmail,
  phone: state.AuthSlice.phone
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  forgotPassword: (data: IForgotPassword) => dispatch(forgotPassword(data)),
  getOtp: (otp: string) => dispatch(getOtp(otp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

const styles = StyleSheet.create({
  mainContainer: {
  },
  forgotPassText: {
    fontFamily: fontFamily.MontserratLight,
    fontWeight: '500',
    fontSize: responsiveFontSize(2),
    color: colors.darkBlue,
  },
  emailContainer: {
    marginVertical: 10,
  },
  emailText: {
    fontFamily: fontFamily.MontserratLight,
    fontWeight: '400',
    fontSize: responsiveFontSize(1.7),
    color: colors.grey,
  },
  inputField: {
    marginVertical: 20,
    backgroundColor: colors.white,
    height: responsiveHeight(6),
    borderRadius: 14,
    paddingLeft: 15,
  },
  getOtpBtn: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    marginVertical: 400,
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  getOtpBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fontFamily.MontserratLight,
    fontSize: responsiveFontSize(1.8),
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});