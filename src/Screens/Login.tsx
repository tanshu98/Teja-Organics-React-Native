import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {splashProductImg, tejaOrganicsImg} from '../assets';
import PersonIcon from 'react-native-vector-icons/MaterialIcons';
import LockIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UnLockIcon from 'react-native-vector-icons/FontAwesome5';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppDispatch, RootState} from '../redux/store';
import {ILoginUser, loginUser} from '../redux/slices/AuthSlice';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';

const LoginSchema = Yup.object().shape({
  loginUsername: Yup.string().email('Invalid Email').required('Email is required'),
  loginPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginProps {
  navigation: any;
  loginUserData:(data:ILoginUser)=>void
}

interface IResetPasswordState {
  showPassword: boolean;
}
export class Login extends Component<LoginProps, IResetPasswordState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }
  
  handleSubmit =async(values: {loginUsername: string; loginPassword: string}) => {
    console.log('Login values:', values);
    // console.log("loginData----", loginData);
    const data={
      login:values.loginUsername,
      password:values.loginPassword,
      fcm_token:' '

    }
    const res=await this.props.loginUserData(data)
    //@ts-ignore
    console.log(res.payload,'=====>local login')
    // Toast.show({
    //   type: 'success',
    //   text1: 'Congratulations🤩 You have successfully Logged in🥰 ',
    // });
    this.props.navigation.navigate('BottomTabNavigation');
  };

  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const {showPassword} = this.state;

    return (
      <Formik
        initialValues={{
          loginUsername: '',
          loginPassword: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={this.handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.safeAreaContainer}>
            <View style={styles.loginContainer}>
              <Image
                source={tejaOrganicsImg}
                style={styles.tejaOrganicsLogoContainer}
              />

              <View style={styles.loginForm}>
                <Text style={styles.signInHeading}>Sign In Account</Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.loginUsername.toLowerCase()}
                    onChangeText={handleChange('loginUsername')}
                    onBlur={handleBlur('loginUsername')}
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
                {errors.loginUsername && touched.loginUsername && (
                  <Text style={styles.errorText}>{errors.loginUsername}</Text>
                )}

                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Password"
                    value={values.loginPassword}
                    onChangeText={handleChange('loginPassword')}
                    onBlur={handleBlur('loginPassword')}
                    style={styles.inputField}
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
                    ) : (
                      <LockIcon
                        name="lock"
                        size={24}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.loginPassword && touched.loginPassword && (
                  <Text style={styles.errorText}>{errors.loginPassword}</Text>
                )}

                <TouchableOpacity
                  style={styles.signInBtn}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.signInBtnText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Forget Password Screen')
                  }>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Image source={splashProductImg} />
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  console.log('LOGIN---state.AuthSlice---', state.AuthSlice);
  return {
    loginData: state.AuthSlice.token,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loginUserData: async(data: ILoginUser) => {return await dispatch(loginUser(data))},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  safeAreaContainer: {
    // flex: 1,
    alignItems: 'center',
    // backgroundColor:colors.light
  },
  loginContainer: {
    alignItems: 'center',
  },
  tejaOrganicsLogoContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(20),
    resizeMode: 'cover',
    // marginBottom: 20,
  },
  loginForm: {
    width: responsiveWidth(80),
  },
  signInHeading: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
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
    // flex: 1,
    marginLeft: 10,
    backgroundColor: colors.white,
    height: responsiveHeight(6),
  },
  signInBtn: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
  },
  signInBtnText: {
    textAlign: 'center',
    color: colors.white,
  },
  icon: {
    marginHorizontal: 15,
  },
  forgotPassword: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    color: colors.white,
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
