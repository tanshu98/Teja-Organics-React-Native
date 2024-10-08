import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import SplashScreen from '../Screens/SplashScreen';
import SigninScreen, {LoginSignupScreen} from '../Screens/LoginSignupScreen';
import TermsAndConditons from '../Screens/TermsAndConditions';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LeftArrowIcon from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/Colors';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';
import BottomNavigation from '../navigations/BottomTabNavigation';
import Otp from '../Screens/Otp';
import ForgotPasswordScreen from '../Screens/ForgetPasswordScreen';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {
  isActive: boolean;
  isAuth: boolean | null;
}
const Stack = createNativeStackNavigator();
export class StackNavigation extends Component<{}, State> {
  timerId: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      isActive: false,
      isAuth: null, // Initially null to signify loading state
    };
  }

  userLoggedIn = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log("token---StackNavigation---", token);

      // Set isAuth state based on token existence
      this.setState({isAuth: !!token}); // Set to true if token exists, otherwise false
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  splashScreenHandler = () => {
    this.setState({
      isActive: true,
    });
  };

  componentDidMount(): void {
    this.userLoggedIn();
    // Splash screen timer
    setTimeout(() => {
      this.splashScreenHandler();
    }, 3000);
  }

  render() {
    const {isActive, isAuth} = this.state;

    // Wait until the splash screen has been shown and authentication state is checked
    if (!isActive || isAuth === null) {
      return <SplashScreen />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* If user is not authenticated, show Login/Signup screen */}
          {isAuth === false ? (
            <Stack.Screen
              options={{headerShown: false}}
              name="loginSignupScreen">
              {props => <LoginSignupScreen {...props} />}
            </Stack.Screen>
          ) : (
            // If user is authenticated, show BottomNavigation (home screen)
            <Stack.Screen
              options={{headerShown: false}}
              name="BottomTabNavigation">
              {props => <BottomNavigation {...props} />}
            </Stack.Screen>
          )}

          {/* Other screens converted to the same format */}
          <Stack.Screen
            options={{headerShown: false}}
            name="signup">
            {props => <Signup {...props} />}
          </Stack.Screen>
          
          <Stack.Screen
            options={{headerShown: false}}
            name="Login">
            {props => <Login {...props} />}
          </Stack.Screen>

          <Stack.Screen
            options={({navigation}) => ({
              headerTransparent: true,
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LeftArrowIcon
                    name="left"
                    size={24}
                    color={colors.darkBlack}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ),
            })}
            name="Otp Verification">
            {props => <Otp {...props} />}
          </Stack.Screen>

          <Stack.Screen
            options={({navigation}) => ({
              headerTransparent: true,
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LeftArrowIcon
                    name="left"
                    size={24}
                    color={colors.darkBlack}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ),
            })}
            name="Terms & conditions">
            {props => <TermsAndConditons {...props} />}
          </Stack.Screen>

          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity>
                  <LeftArrowIcon
                    name="left"
                    size={24}
                    color={colors.darkBlack}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              ),
            }}
            name="Forget Password Screen">
            {props => <ForgotPasswordScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 15,
  },
});

export default StackNavigation;
