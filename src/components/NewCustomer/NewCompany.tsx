import React, { Component, Dispatch } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';
import NavigationManager from '../../managers/navigation.manager';
import CompanyRegistrationForm from './CompanyRegistrationForm';

class NewCompany extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  private focusListener;

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
  }

  private async handleFocus() {
    console.log("focused on new user");
    NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
          <View style={styles.registrationFormContainer}>
            <CompanyRegistrationForm></CompanyRegistrationForm>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 10,
    backgroundColor: SpontioColors.Primary
  },
  keyboardView: {
    flexGrow: 1
  },
  titleContainer: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  registrationFormContainer: {
    flexGrow: 4,
    backgroundColor: SpontioColors.PrimaryDark,
    alignContent: 'center',
    justifyContent: 'center'
  },
  registerWithFormContainer: {
    flexGrow: 6
  },
  descriptionContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  descriptionText: {
    color: SpontioColors.White,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

interface IStateProps {
  session: Session,
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session,
  }
}

type State = {

}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(NewCompany);