import React, {Component, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
interface IProps {
  children: ReactNode;
}
class KeyboardWrapper extends Component<IProps, {}> {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'space-between',
            // minHeight: '100%',  
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {this.props.children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default KeyboardWrapper;

const styles = StyleSheet.create({});