import React, {Component} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {splashBg, tejaOrganicsImg, splashProductImg} from '../assets/index';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../constants/Colors';


export class SplashScreen extends Component {
  render() {
    return (

        <ImageBackground
          source={splashBg}
          resizeMode="cover"
          style={styles.mainContainer}>
          <View style={styles.imageWrapper}>
            <Image source={tejaOrganicsImg} style={styles.imageContainer} />
            <Image source={splashProductImg} style={styles.imageContainer} />

          </View>
        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:colors.light
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(40),
    resizeMode: 'contain', 
  },
});

export default SplashScreen;
