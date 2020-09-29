import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux'
import { AnyAction, bindActionCreators } from 'redux';
import { NavigationProp } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { Session } from '../../redux/reducer/sessionReducer';
import ButtonOutline from '../Button/ButtonOutline';
import { User } from '../../redux/reducer/userReducer';
import { changeEmail, changePassword } from '../../redux/actions/user';
import { translate } from '../../managers/language.manager';
import NavigationManager from '../../managers/navigation.manager';
import LottieView from 'lottie-react-native';
import { ThunkDispatch } from 'redux-thunk';
import { boundRegisterUser } from '../../redux/actions/session';

class UserRegistrationFormSuccess extends Component<Props, State> {

  public readonly state: State = {
    confirmPassword: "",
  }

  async componentDidMount() {

  }

  async componentWillUnmount() {

  }

  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={moderateScale(100)}>
          <View style={styles.successContainer}>
            <LottieView style={styles.lottieView} source={require('../../assets/animations/mail.json')} autoPlay loop={false} />

            <Text style={styles.successText}>
              Confirmation E-Mail has sent to your inbox!
              </Text>
            <View style={styles.buttonContainer}>
              <ButtonOutline width={moderateScale(250)} title={"Okay"} onPress={this.onOkButtonClicked.bind(this)}></ButtonOutline>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  onOkButtonClicked = async () => {
    this.props.navigation.navigate(translate("navigation.welcome"));
    NavigationManager.setHeaderOptions(false, false, false, false);
  }

}

const styles = StyleSheet.create({
  container: {
    padding: scale(50),
  },
  button: {
    height: moderateScale(45),
    marginBottom: moderateScale(10),
    backgroundColor: SpontioColors.Primary,
    borderWidth: 1,
    borderColor: SpontioColors.Primary
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: SpontioColors.White,
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
  passwordDescription: {
    color: SpontioColors.White,
    fontSize: moderateScale(12),
    paddingVertical: moderateScale(10),
    textAlign: 'justify'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContainer: {
    height: '100%',
    alignItems: 'center',
  },
  baseContainer: {
    flex: 1
  },
  successText: {
    color: SpontioColors.Primary,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: moderateScale(30)
  },
  lottieView: {
    width: moderateScale(280),
    height: moderateScale(280)
  }
});

interface IStateProps {
  session: Session;
  user: User
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session,
    user: state.userReducer.user
  }
}

interface IDispatchProps {
  changeEmail: (username: string) => void;
  changePassword: (password: string) => void;
  boundRegisterUser: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
  return {
    changeEmail: (username: string) => dispatch(changeEmail(username)),
    changePassword: (password: string) => dispatch(changePassword(password)),
    boundRegisterUser: bindActionCreators(boundRegisterUser, dispatch)
  }
}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

interface State {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserRegistrationFormSuccess);