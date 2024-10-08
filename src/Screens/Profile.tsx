import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';

interface IProfileProps {
  navigation: StackNavigationProp<any, any>;
}

export class Profile extends Component<IProfileProps> {
  constructor(props: IProfileProps) {
    super(props);
  }

  profileScreenHandler = async () => {
    const { navigation } = this.props;
    try {
      await AsyncStorage.removeItem('token');
      console.log("Token is removed");
      // Navigate to login screen after logout
      navigation.navigate('loginSignupScreen');  // `replace` ensures user can't go back to profile screen after logging out
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <Text>Profile</Text>
        <TouchableOpacity style={styles.LogoutBtn} onPress={this.profileScreenHandler}>
          <Text style={styles.LogoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  LogoutBtn: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,  
  },
  LogoutBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16, 
  },
});

export default Profile;
