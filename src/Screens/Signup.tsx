import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import PersonIcon from 'react-native-vector-icons/MaterialIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LockIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UnLockIcon from 'react-native-vector-icons/FontAwesome5';
import ReferalIcon from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import KeyboardWrapper from '../components/KeyboardWrapper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AppDispatch, RootState} from '../redux/store';
import {getOtp, IUser, registerUser} from '../redux/slices/AuthSlice';
import {connect} from 'react-redux';

interface ISignupProps {
  navigation: any;
  signupUser: (data: IUser) => void;
  getOtp:(otp:string)=>void
}

interface Values {
  username: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  referral_code: string;
}

interface ISignupState {
  isChecked: boolean;
  showPassword: boolean
  showConfirmPassword: boolean

}

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  phone: Yup.string()
    .length(10, 'Please enter exactly 10 digits')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot be more than 20 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  referral_code: Yup.string(),
});

export class Signup extends Component<ISignupProps, ISignupState> {
  constructor(props: ISignupProps) {
    super(props);
    this.state = {
      isChecked: false,
      showPassword: false,
      showConfirmPassword: false
    };
    
  }

  handleCheckBoxChange = (isChecked: boolean) => {
    this.setState({isChecked});
    if(isChecked) {
      this.props.navigation.navigate('Terms & conditions');
    }
  };

  generateOtp = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };
  toggleShowConfirmPassword = () => {
    this.setState(prevState => ({
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  // handleSignupSubmit = async (values: Values) => {
  //   const {signupUser,getOtp} = this.props;
  //   if (this.state.isChecked) {
  //     // console.log('Form Values:', values);
  //     const otp = this.generateOtp();
  //     getOtp(otp)
  //     const data = {
  //       email: values.email,
  //       username: values.username,
  //       password: values.password,
  //       phone: values.phone,
  //       password_confirmation: values.password_confirmation,
  //       role: 'admin',
  //       referral_code: '',
  //     };

     

  //     signupUser(data);
  //     this.props.navigation.navigate('Otp Verification')
  //   } else {
  //     Alert.alert('Please accept the terms and conditions.');
  //   }
  // };

  handleSignupSubmit = async (values: Values) => {
    const {signupUser, getOtp,navigation} = this.props;
    
    if (this.state.isChecked) {
      const otp = this.generateOtp();
      getOtp(otp);
      
      const data = {
        email: values.email,
        username: values.username,
        password: values.password,
        phone: values.phone,
        password_confirmation: values.password_confirmation,
        role: 'admin',
        referral_code: values.referral_code,
      };

      console.log('data---SIGNUP---',data)

      const resultAction = await signupUser(data);

      if (registerUser.fulfilled.match(resultAction)) {
        navigation.navigate('Otp Verification');
      } else if (registerUser.rejected.match(resultAction)) {
        Alert.alert('Signup failed 😕 Please try again.');
      }
    } else {
      Alert.alert('Please accept the terms and conditions.');
    }
  };

  render() {
    const {isChecked, showPassword, showConfirmPassword} = this.state;

    return (
      <Formik
        initialValues={{
          username: '',
          phone: '',
          email: '',
          password: '',
          password_confirmation: '',
          referral_code: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={this.handleSignupSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardWrapper>
            <View style={styles.signupForm}>
              <View style={styles.nameContainer}>
                <Text>Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    style={styles.inputField}
                    placeholder="Username"
                  />
                  <PersonIcon
                    name="person"
                    size={24}
                    color={colors.grey}
                    style={styles.icon}
                  />
                </View>
                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>

              <View style={styles.nameContainer}>
                <Text>Phone</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    style={styles.inputField}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                  />
                  <PhoneIcon
                    name="phone"
                    size={24}
                    color={colors.grey}
                    style={styles.icon}
                  />
                </View>
                {errors.phone && touched.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.nameContainer}>
                <Text>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.email.toLowerCase()}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.inputField}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                  <EmailIcon
                    name="email"
                    size={24}
                    color={colors.grey}
                    style={styles.icon}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.nameContainer}>
                <Text>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={styles.inputField}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={this.toggleShowPassword}>
                  {showPassword ? (
                        <UnLockIcon
                        name="unlock"
                        size={19}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    ): (  <LockIcon
                      name="lock"
                      size={24}
                      color={colors.grey}
                      style={styles.icon}
                    />)}
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.nameContainer}>
                <Text>Password Confirm</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.password_confirmation}
                    onChangeText={handleChange('password_confirmation')}
                    onBlur={handleBlur('password_confirmation')}
                    style={styles.inputField}
                    placeholder="Password Confirm"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={this.toggleShowConfirmPassword}>
                  {showConfirmPassword ? (
                        <UnLockIcon
                        name="unlock"
                        size={19}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    ): (  <LockIcon
                      name="lock"
                      size={24}
                      color={colors.grey}
                      style={styles.icon}
                    />)}
                  </TouchableOpacity>
                </View>
                {errors.password_confirmation &&
                  touched.password_confirmation && (
                    <Text style={styles.errorText}>
                      {errors.password_confirmation}
                    </Text>
                  )}
              </View>

              <View style={styles.nameContainer}>
                <Text>Referral Code</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.referral_code}
                    onChangeText={handleChange('referral_code')}
                    onBlur={handleBlur('referral_code')}
                    style={styles.inputField}
                    placeholder="Referral Code"
                  />
                  <ReferalIcon
                    name="pricetag"
                    size={24}
                    color={colors.grey}
                    style={styles.icon}
                  />
                </View>
                {errors.referral_code && touched.referral_code && (
                  <Text style={styles.errorText}>{errors.referral_code}</Text>
                )}
              </View>

              <View style={styles.termsConditionContainer}>
                <BouncyCheckbox
                  isChecked={isChecked}
                  fillColor={colors.darkBlack}
                  onPress={this.handleCheckBoxChange}
                  iconStyle={{
                    borderRadius: 45,
                  }}
                />
                <TouchableOpacity>
                  <Text style={styles.termsText}>Terms and conditions</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={()=> handleSubmit()}>
                <Text style={styles.signUpBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardWrapper>
        )}
      </Formik>
    );
  }
}


const mapStateToProps = (state: RootState) => {
  console.log('state.AuthSlice---', state.AuthSlice);
  return {
    signupData: state.AuthSlice,
  };
};


const mapDispatchToProps = (dispatch: AppDispatch) => {
  console.log('Dispatching signupUser');
  return {
    signupUser: (data: IUser) => dispatch(registerUser(data)),
    getOtp: (otp:string)=>{
      dispatch(getOtp(otp))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  signupForm: {
    marginHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'space-between',
    elevation: 0,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.white,
    height: responsiveHeight(6),
  },
  nameContainer: {
    gap: 7,
  },
  termsConditionContainer: {
    flexDirection: 'row',
  },
  termsText: {
    color: colors.darkBlue,
    fontSize: responsiveFontSize(2),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
  },
  icon: {
    marginHorizontal: 15,
  },
  signUpBtn: {
    backgroundColor: colors.dark,
    padding: 15,
    borderRadius: 20,
    marginVertical: 20,
  },
  signUpBtnText: {
    textAlign: 'center',
    color: colors.white,
  },
});
