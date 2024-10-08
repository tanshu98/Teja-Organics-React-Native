import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../constants/Colors';

import ResetPassword from '../components/ResetPassword';
import ForgetPassOtp from '../components/ForgetPassOtp';
import ForgetPassword from '../components/ForgetPassword';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IForgetPasswordScreenProps {
  navigation: any
}

const labels = ['Password', 'OTP', 'Set New'];

const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.light,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.light,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.light,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.light,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.light,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: colors.grey,
};

const renderStepIndicator = ({
  position,
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  if (stepStatus === 'finished') {
    return <MaterialIcons name="check" size={20} color="#fff" />;
  }
  return (
    <View
      style={[
        styles.commonDotStyles,
        stepStatus === 'current' ? styles.activeDot : styles.inactiveDot,
      ]}
    />
  );
};

interface State {
  currentStep: number;
}

export default class ForgotPasswordScreen extends Component<IForgetPasswordScreenProps, State> {
  constructor(props: IForgetPasswordScreenProps) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }
  handleNextTab = () => {
    if (this.state.currentStep !== labels.length - 1) {
      this.setState(prev => ({
        currentStep: prev.currentStep + 1,
      }));
    }
  };
  renderStepContent = () => {
    const {currentStep} = this.state;
    switch (currentStep) {
      case 0:
        return <ForgetPassword handleNextTab={this.handleNextTab} />;
      case 1:
        return <ForgetPassOtp handleNextTab={this.handleNextTab} />;
      case 2:
        return <ResetPassword navigation={this.props.navigation} />;
      default:
        return null;
    }
  };

  render() {
    const {currentStep} = this.state;
    console.log('ForgetPassword Screen component rendered');

    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          labels={labels}
          stepCount={labels.length}
          renderStepIndicator={renderStepIndicator}
        />
        <View style={styles.content}>{this.renderStepContent()}</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    marginVertical: 80,
  },
  content: {
    margin: 50,
  },
  commonDotStyles: {width: 8, height: 8, borderRadius: 12.5},
  inactiveDot: {
    backgroundColor: colors.grey,
  },
  activeDot: {
    backgroundColor: colors.light,
  },
});
