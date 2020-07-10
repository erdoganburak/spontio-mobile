import React, { Component, Dispatch } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';
import LoginForm from './UserRegistrationForm';
import NavigationManager from '../../managers/navigation.manager';

class NewUser extends Component<Props, State> {

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
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
          <View style={styles.registrationFormContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>You are almost there!</Text>
            </View >
            <LoginForm></LoginForm>
          </View>
          <View style={styles.registerWithFormContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>Or register with</Text>
            </View >

          </View>
        </KeyboardAvoidingView>
      </View>

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
  titleText: {
    color: SpontioColors.White,
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    textAlign: 'center',
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
  },
  facebookContainer: {
    flex: 4,
    backgroundColor: SpontioColors.Info,
  },
  facebookText: {
    color: SpontioColors.White
  },
  googleContainer: {
    flex: 4

  },
  googleText: {

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

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(NewUser);