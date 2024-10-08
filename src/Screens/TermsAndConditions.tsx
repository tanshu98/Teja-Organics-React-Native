import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import RightArrowIcon from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../constants/Colors';
import {AppDispatch, RootState} from '../redux/store';
import {termsAndCondition} from '../redux/slices/AuthSlice';
import {connect} from 'react-redux';

interface TermsAndConditonsProp {
  navigation: any;
  termsAndConditionData: any[];
  fetchTermsAndConditions: () => void;
}

interface ITermsAndConditionState {
  id: number | null;
  terms_and_condition: string;
  created_at: string;
  updated_at: string;
}

export class TermsAndConditons extends Component<
  TermsAndConditonsProp,
  ITermsAndConditionState
> {
  constructor(props: TermsAndConditonsProp) {
    super(props);
    this.state = {
      id: null,
      terms_and_condition: '',
      created_at: '',
      updated_at: '',
    };
  }

  componentDidMount(): void {
    this.props.fetchTermsAndConditions();
  }

  renderItem = ({item}: {item: any}) => (
    <View style={styles.conditionsContainer}>
      <RightArrowIcon
        name="right"
        size={18}
        color={colors.darkBlack}
        style={styles.icon}
      />
      <Text style={styles.conditionText}>{item.terms_and_condition}</Text>
    </View>
  );

  render() {
    const {termsAndConditionData} = this.props;

    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.primaryContainer}>
          <FlatList
            data={termsAndConditionData} 
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()} 
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({

    termsAndConditionData: state.AuthSlice.termsAndConditionData

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchTermsAndConditions: () => dispatch(termsAndCondition()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditons);

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.signupBg,
    marginVertical: 50,
  },
  primaryContainer: {
    marginVertical: 10,
    marginHorizontal: 35,
    width: responsiveWidth(80),
    borderColor: colors.grey,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
  },
  conditionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  conditionText: {
    color: colors.grey,
    fontWeight: '600',
    fontSize: responsiveFontSize(1.8),
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 4,
  },
  icon: {
    marginHorizontal: 15,
  },
});
