import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {fontFamily} from '../constants/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {colors} from '../constants/Colors';
import EyeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EyeOffIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {forgotPassword, IForgotPassword} from '../redux/slices/AuthSlice';
import {AppDispatch, RootState} from '../redux/store';
import {connect} from 'react-redux';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot be more than 20 characters')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Password confirmation is required'),
});

interface IResetPasswordProps {
  navigation: any;
  resetPasswordData: (data: IForgotPassword) => void;
}

interface IResetPasswordState {
  showPassword: boolean;
  showConfirmPassword: boolean;

}

export class ResetPassword extends Component<
  IResetPasswordProps,
  IResetPasswordState
> {
  constructor(props: IResetPasswordProps) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirmPassword: false

    };
  }

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

  showAlert = (errors: any) => {
    const errorMessages = Object.values(errors).join('\n');
    Alert.alert('Validation Errors', errorMessages);
  };

  handleResetPasswordSubmit = (values: {
    password: string;
    confirm_password: string;
    username: string;
  }) => {
    const {resetPasswordData, navigation} = this.props;

    const data = {
      password: values.password,
      confirm_password: values.confirm_password,
      username: values.username,
    };

    resetPasswordData(data);
    navigation.navigate('Login');

    Alert.alert('Success', 'Password reset successfully!');
  };

  render() {
    const {showPassword,showConfirmPassword} = this.state;

    return (
      <Formik
        initialValues={{password: '', confirm_password: '', username: ''}}
        validationSchema={ResetPasswordSchema}
        onSubmit={this.handleResetPasswordSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.primaryContainer}>
            <Text style={styles.createNewPass}>Create New Password</Text>

            <View style={styles.passNewPassContainer}>
              <View style={styles.newPasswordContainer}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={styles.inputField}
                    placeholder="New Password"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={this.toggleShowPassword}>
                    {showPassword ? (
                      <EyeOffIcon
                        name="eye-off"
                        size={24}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    ) : (
                      <EyeIcon
                        name="eye"
                        size={24}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.confirmPasswordContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={values.confirm_password}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    style={styles.inputField}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={this.toggleShowConfirmPassword}>
                    {showConfirmPassword ? (
                      <EyeOffIcon
                        name="eye-off"
                        size={24}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    ) : (
                      <EyeIcon
                        name="eye"
                        size={24}
                        color={colors.grey}
                        style={styles.icon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {touched.confirm_password && errors.confirm_password && (
                  <Text style={styles.errorText}>
                    {errors.confirm_password}
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.verifyPasswordBtn}
              onPress={() => {
                if (Object.keys(errors).length > 0) {
                  this.showAlert(errors);
                } else {
                  handleSubmit();
                }
              }}>
              <Text style={styles.verifyPasswordBtnText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  phone: state.AuthSlice.phone
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  console.log('Dispatching signupUser');
  return {
    resetPasswordData: (data: IForgotPassword) =>
      dispatch(forgotPassword(data)),
  };
};

const styles = StyleSheet.create({
  primaryContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  createNewPass: {
    fontFamily: fontFamily.MontserratRegular,
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    color: colors.darkBlue,
    marginBottom: 20,
    textAlign: 'center',
  },
  passNewPassContainer: {
    gap: 10,
  },
  newPasswordContainer: {
    gap: 15,
  },
  confirmPasswordContainer: {
    gap: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'space-between',
    elevation: 0,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.white,
    height: responsiveHeight(6),
  },
  label: {
    fontSize: responsiveFontSize(2),
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 15,
  },
  verifyPasswordBtn: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    marginVertical: 25,
  },
  verifyPasswordBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.5),
    marginTop: -10,
    marginBottom: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
