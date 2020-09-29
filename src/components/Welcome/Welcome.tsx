import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { TRootReducer } from '../../redux/store';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalBase, { IProps } from '../Modal/ModalBase';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions';
import { changeLoggedInState, changeRole } from '../../redux/actions/session';
import { translate } from '../../managers/language.manager';
import { Session } from '../../redux/reducer/sessionReducer';
import ButtonPrimary from '../Button/ButtonPrimary';
import ButtonOutline from '../Button/ButtonOutline';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import NavigationManager from '../../managers/navigation.manager';
import { Role } from '../../enums/role.enum';
import { ThunkDispatch } from 'redux-thunk';

class Welcome extends Component<Props, State> {

    public readonly state: State = {
        showModal: false
    }

    private focusListener;

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
        if (this.props.session.loggedIn) {
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

    private async handleFocus() {
        console.log("focused on welcome screen");
        NavigationManager.showHeader(false);
    }

    componentWillMount() {

        /*
                <FastImage
                style={{ width: moderateScale(300), height: moderateScale(80) }}
                source={require('../../assets/images/spontio_logo.png')}
                resizeMode={FastImage.resizeMode.contain}
               
        />
         */
    }

    async componentWillUnmount() {
        // Remove the event listener
        this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());

    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.renderModal()}
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        style={{ width: moderateScale(300), height: moderateScale(80) }}
                        source={require('../../assets/images/spontio_logo.png')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonOutline title={translate("welcome.guest_login")} onPress={this.onClickGuestLogin.bind(this)} ></ButtonOutline>
                    <ButtonPrimary title={"I AM NEW HERE"} onPress={this.onClickIAmNewHere.bind(this)} ></ButtonPrimary>
                </View>
                <View style={styles.alreadyRegisteredContainer}>
                    <Text style={styles.alreadyRegisteredText}>
                        {"Already Registered?"}
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={this.onClickLogin.bind(this)}>
                        <Text style={styles.buttonLoginText}>{"Login"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <View style={styles.termsAndConditionsContainer}>
                        <Text style={styles.textFirstHalf}>
                            {"By entering I Accept"}
                        </Text>
                        <Text
                            style={styles.buttonTextSecondHalf}
                            onPress={this.onClickTermsAndConditions.bind(this)}>
                            {"Terms and Conditions"}
                        </Text>
                    </View>
                </View>
            </View >
        );
    }

    private onClickGuestLogin(): void {
        this.props.changeLoggedInState(true);
        NavigationManager.setHeaderOptions(true, true, false, true);
        this.props.changeRole(Role.Guest);
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: translate("navigation.home") },
                ],
            })
        );
    }

    private onClickIAmNewHere(): void {
        this.props.navigation.navigate(translate("navigation.new_customer"));
        NavigationManager.setHeaderOptions(true, true, true, true);
    }

    private onClickLogin(): void {
        this.props.navigation.navigate(translate("navigation.login"));
        NavigationManager.setHeaderOptions(true, false, true, true);
    }

    private onClickTermsAndConditions(): void {
        this.setState({ showModal: true });
    }

    private onCloseModal(): void {
        this.setState({ showModal: false });
    }

    private onBackdropPressModal(): void {
        this.setState({ showModal: false });
    }

    private renderModal() {
        const _modalProps: IProps = {
            isVisible: this.state.showModal,
            onBackdropPress: this.onBackdropPressModal.bind(this),
            title: "Terms And Conditions",
            closeButtonHide: false,
            needKeyboardAvoid: false,
            onClose: this.onCloseModal.bind(this),
            backdropColor: SpontioColors.Black,
            backdropOpacity: 0.15
        }
        return (
            <ModalBase
                modalProps={_modalProps}
            >
                <View>
                    <TermsAndConditions></TermsAndConditions>
                </View>
            </ModalBase>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SpontioColors.Primary
    },
    icon: {
        color: SpontioColors.White
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: moderateScale(30)
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alreadyRegisteredContainer: {
        flex: 1,
        alignSelf: 'center'
    },
    alreadyRegisteredText: {
        color: SpontioColors.White,
        fontSize: moderateScale(14)
    },
    buttonLogin: {
        flex: 0.5,
        color: SpontioColors.White,
        fontWeight: "bold",
    },
    buttonLoginText: {
        color: SpontioColors.White,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: moderateScale(10),
        fontSize: moderateScale(16)
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    termsAndConditionsContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    textFirstHalf: {
        color: SpontioColors.White,
        textAlign: 'center',
    },
    buttonSecondHalf: {
        flex: 0.5,
    },
    buttonTextSecondHalf: {
        color: SpontioColors.White,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: moderateScale(10),
        fontSize: moderateScale(14)
    }
});

interface IStateProps {
    session: Session,
    navigationProperty: NavigationProperty
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        session: state.sessionReducer.session,
        navigationProperty: state.navigationReducer.navigationProperty
    }
}

interface IDispatchProps {
    changeLoggedInState: (loggedIn: boolean) => void;
    changeRole: (role: Role) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
    return {
        changeLoggedInState: (loggedIn: boolean) => dispatch(changeLoggedInState(loggedIn)),
        changeRole: (role: Role) => dispatch(changeRole(role)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {
    showModal: boolean;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Welcome);