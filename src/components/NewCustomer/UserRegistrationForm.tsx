import React, { Component, Dispatch } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux'
import { AnyAction } from 'redux';
import { NavigationProp } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { Session } from '../../redux/reducer/sessionReducer';
import ButtonOutline from '../Button/ButtonOutline';
import { User } from '../../redux/reducer/userReducer';
import { changeEmail, changePassword } from '../../redux/actions/user';
import ToastManager from '../../managers/toast.manager';
import HelperUtils from '../../utils/helper.utils';
import SessionApi from '../../api/session.api';
import { translate } from '../../managers/language.manager';
import NavigationManager from '../../managers/navigation.manager';
import LottieView from 'lottie-react-native';

class UserRegistrationForm extends Component<Props, State> {

  public readonly state: State = {
    confirmPassword: "",
    success: false,
    loading: false
  }

  async componentDidMount() {

  }

  async componentWillUnmount() {
    this.props.changeEmail(null);
    this.props.changePassword(null);
    this.setState({ confirmPassword: null })
  }

  render() {
    return (
      <View>
        {!this.state.success &&
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={moderateScale(100)}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>You are almost there!</Text>
            </View>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType="email-address"
              placeholder={"E-Mail Address"}
              placeholderTextColor="rgba(255,255,255,0.8)"
              style={styles.input}
              returnKeyType="next"
              value={this.props.user.email}
              onChangeText={(email) => this.props.changeEmail(email)}
            />
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={"Password"}
              placeholderTextColor="rgba(255,255,255,0.8)"
              returnKeyType="next"
              secureTextEntry
              style={styles.input}
              value={this.props.user.password}
              onChangeText={(password) => this.props.changePassword(password)}
            />

            <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={"Confirm Password"}
              placeholderTextColor="rgba(255,255,255,0.8)"
              returnKeyType="send"
              secureTextEntry
              style={styles.input}
              value={this.state.confirmPassword}
              onChangeText={(passwordRepeat) => this.setState({ confirmPassword: passwordRepeat })}
            />
            <Text style={styles.passwordDescription}>
              Your password must be at least 8 characters, with at least 1 number and 1 special character.
        </Text>
            <View style={styles.buttonContainer}>
              {
                this.state.loading && <ActivityIndicator style={styles.activityIndicator} color={SpontioColors.White}></ActivityIndicator>
              }
              {
                !this.state.loading && <ButtonOutline width={250} title={"REGISTER"} onPress={this.onLoginButtonClicked.bind(this)}></ButtonOutline>
              }
            </View>
          </KeyboardAvoidingView>
        }
        {
          this.state.success &&
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
        }
      </View>
    );
  }

  onLoginButtonClicked = async () => {
    if (this.validateFields()) {
      try {
        this.setState({ loading: true });
        await SessionApi.registerUser(this.props.user.email, this.props.user.password);
        this.setState({ success: true });
      } catch (error) {
        ToastManager.showDanger("Error occured while registering");
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onOkButtonClicked = async () => {
    this.props.navigation.navigate(translate("navigation.welcome"));
    NavigationManager.setHeaderOptions(false, false, false, false);
  }

  private validateFields(): boolean {
    if (this.props.user.email == null || this.props.user.password == "") {
      ToastManager.showDanger("Email field cannot be empty");
      return false;
    } else if (!HelperUtils.validateEmail(this.props.user.email)) {
      ToastManager.showDanger("Enter a valid email address");
      return false;
    }
    else if (this.props.user.password == null || this.props.user.password == "") {
      ToastManager.showDanger("Password field cannot be empty");
      return false;
    } else if (this.state.confirmPassword == null || this.props.user.password == "") {
      ToastManager.showDanger("Confirm field cannot be empty");
      return false;
    } else if (this.state.confirmPassword !== this.props.user.password) {
      ToastManager.showDanger("Passwords not matching");
      return false;
    }
    return true;
  }

}

const styles = StyleSheet.create({
  container: {
    padding: scale(50),
  },
  input: {
    height: moderateScale(45),
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: scale(10),
    color: '#FFF',
    paddingHorizontal: scale(10),
    borderStyle: 'solid',
    fontSize: moderateScale(12)
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
  activityIndicator: {
    paddingTop: moderateScale(10),
    alignContent: 'center',
  },
  baseContainer: {
    flex: 1
  },
  titleContainer: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  titleText: {
    color: SpontioColors.White,
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleTextContainer: {
    paddingVertical: moderateScale(20)
  },
  successText: {
    color: SpontioColors.White,
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

}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
  return {
    changeEmail: (username: string) => dispatch(changeEmail(username)),
    changePassword: (password: string) => dispatch(changePassword(password)),
  }
}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

interface State {
  confirmPassword: string;
  success: boolean;
  loading: boolean;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserRegistrationForm);