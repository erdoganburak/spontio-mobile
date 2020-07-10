import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { TRootReducer } from '../../redux/store';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { changeLoggedInState } from '../../redux/actions/session';
import { Session } from '../../redux/reducer/sessionReducer';
import ButtonOutline from '../Button/ButtonOutline';
import NavigationManager from '../../managers/navigation.manager';
import { translate } from '../../managers/language.manager';

class Login extends Component<Props, State> {

    public readonly state: State = {
        showModal: false
    }

    private focusListener;

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
    }

    private async handleFocus() {
        console.log("focused on login screen");
        NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
    }

    async componentWillUnmount() {
        // Remove the event listener
        this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={{ width: moderateScale(300), height: moderateScale(80) }} source={require('../../assets/spontio_name_logo1.png')} />
                </View>
                <View style={styles.inputContainer}>
                    <StatusBar barStyle="light-content" />
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
                        returnKeyType="send"
                        secureTextEntry
                        style={styles.input}
                    // value={this.props.user.password}
                    // onChangeText={(password) => this.props.changePassword(password)}
                    />
                    <ButtonOutline title={"LOGIN"} onPress={this.onLoginButtonClicked.bind(this)}></ButtonOutline>
                </View>
            </View>
        );
    }

    private onLoginButtonClicked() {
        this.props.changeLoggedInState(true);
        NavigationManager.setHeaderOptions(true, true, false, true);
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: translate("navigation.home") },
                ],
            })
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SpontioColors.Primary,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: SpontioColors.Primary,
        alignSelf: 'center'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: SpontioColors.White
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
});

interface IStateProps {
    session: Session
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        session: state.sessionReducer.session,
    }
}

interface IDispatchProps {
    changeLoggedInState: (loggedIn: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changeLoggedInState: (loggedIn: boolean) => dispatch(changeLoggedInState(loggedIn)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {
    showModal: boolean;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Login);