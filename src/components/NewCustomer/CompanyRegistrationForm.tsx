import React, { Component, Dispatch } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  StatusBar
} from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux'
import { AnyAction } from 'redux';
import { NavigationProp } from '@react-navigation/native';
import { changeLoggedInState } from '../../redux/actions/session';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { Session } from '../../redux/reducer/sessionReducer';
import ButtonOutline from '../Button/ButtonOutline';
import PictureSelector from '../PictureSelector/PictureSelector';
import { ScrollView } from 'react-native-gesture-handler';

class CompanyRegistrationForm extends Component<Props, State> {

  async componentDidMount() {

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.pictureSelectorContainer}>
          <PictureSelector picture={null}></PictureSelector>
        </View>
        <StatusBar barStyle="light-content" />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="default"
          placeholder={"Company Name"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="default"
          placeholder={"Address"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="decimal-pad"
          placeholder={"Post Code"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="default"
          placeholder={"City"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="phone-pad"
          placeholder={"Phone Number"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="url"
          placeholder={"Web"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType="email-address"
          placeholder={"E-Mail Address"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          returnKeyType="next"
        //value={this.props.user.username}
        //onChangeText={(username) => this.props.changeUserName(username)}
        />
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={"Password"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType="next"
          secureTextEntry
          style={styles.input}
        // value={this.props.user.password}
        // onChangeText={(password) => this.props.changePassword(password)}
        />

        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={"Confirm Password"}
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType="send"
          secureTextEntry
          style={styles.input}
        // value={this.props.user.password}
        // onChangeText={(password) => this.props.changePassword(password)}
        />
        <Text style={styles.passwordDescription}>
          Your password must be at least 8 characters, with at least 1 number and 1 special character.
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonOutline width={250} title={"REGISTER"} onPress={this.onRegisterButtonClicked.bind(this)}></ButtonOutline>
        </View>
      </ScrollView>
    );
  }

  onRegisterButtonClicked = async () => {

  }

  private validateFields() {

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
  pictureSelectorContainer: {
    paddingBottom: moderateScale(32)
  },
});

interface IStateProps {
  session: Session;
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session
  }
}

interface IDispatchProps {

}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
  return {
    changeLoggedInState: (loggedIn: boolean) => dispatch(changeLoggedInState(loggedIn)),
  }
}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

interface State {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(CompanyRegistrationForm);