import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, StatusBar, KeyboardAvoidingView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import PictureSelector from '../PictureSelector/PictureSelector';
import CameraComponent from '../Camera/CameraComponent';
import { Camera } from '../../redux/reducer/cameraReducer';
import { TRootReducer } from '../../redux/store';
import { AnyAction } from 'redux';
import { showCamera, showTakenPicture, changePicture } from '../../redux/actions/camera';
import { User } from '../../redux/reducer/userReducer';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ButtonOutline from '../Button/ButtonOutline';
import { Gender } from '../../enums/gender.enum';
import NavigationManager from '../../managers/navigation.manager';
import CameraManager from '../../managers/camera.manager';
import { PictureSelectorObject } from '../../redux/reducer/pictureSelectorReducer';
import { showPictureSelectorModal } from '../../redux/actions/pictureSelector';
import { changeProfilePicture } from '../../redux/actions/user';

class CompanyProfile extends Component<Props, State> {

    private focusListener;

    public readonly state: State = {
        date: null,
        selectedGender: null,
        loading: false
    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
    }

    async componentWillUnmount() {
        this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
    }

    private async handleFocus() {
        console.log("handle focus");
        if (this.props.camera.showCamera || this.props.camera.showTakenPicture) {
            CameraManager.resetCamera();
        }
        NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
    }

    public onPictureSave() {
        if (this.props.camera.picture) {
            this.props.changeProfilePicture(this.props.camera.picture);
            this.props.showPictureSelectorModal(false);
        }
    }

    private onSaveClicked() {

    }

    render() {
        if (this.props.camera.showCamera)
            return (
                <CameraComponent navigation={this.props.navigation} onPictureSave={this.onPictureSave.bind(this)}></CameraComponent>
            );
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView>
                    <View style={styles.pictureSelectorContainer}>
                        <PictureSelector picture={this.props.user.picture_id}></PictureSelector>
                    </View>
                    <View style={styles.other}>
                        <View style={styles.inputContainer}>
                            <StatusBar barStyle="light-content" />
                            <TextInput
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholder={"Username"}
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
                                keyboardType="default"
                                placeholder={"Website"}
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
                            <View>
                                <ButtonOutline title={"SAVE"} onPress={this.onSaveClicked.bind(this)}></ButtonOutline>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: SpontioColors.PrimaryDark
    },
    pictureSelectorContainer: {
        flex: 0.5,
        padding: moderateScale(20)
    },
    other: {
        flex: 1,
        paddingTop: moderateScale(10)
    },
    input: {
        height: moderateScale(45),
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: scale(10),
        color: SpontioColors.White,
        paddingHorizontal: scale(10),
        borderStyle: 'solid',
        fontSize: moderateScale(12),
    },
    inputContainer: {
        flex: 1,
        backgroundColor: SpontioColors.PrimaryDark,
        alignSelf: 'center'
    }
});

interface IStateProps {
    camera: Camera,
    user: User,
    pictureSelector: PictureSelectorObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        camera: state.cameraReducer.camera,
        user: state.userReducer.user,
        pictureSelector: state.pictureSelectorReducer.pictureSelectorObject
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

interface IDispatchProps {
    showCamera: (show: boolean) => void;
    changeProfilePicture: (picture_id: string) => void
    showTakenPicture: (showTakenPicture: boolean) => void;
    changePicture: (picture: string) => void;
    showPictureSelectorModal: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        changeProfilePicture: (picture_id: string) => dispatch(changeProfilePicture(picture_id)),
        showTakenPicture: (show: boolean) => dispatch(showTakenPicture(show)),
        changePicture: (picture: string) => dispatch(changePicture(picture)),
        showPictureSelectorModal: (show: boolean) => dispatch(showPictureSelectorModal(show)),
    }
}

type State = {
    date: Date,
    selectedGender: Gender,
    loading: boolean
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(CompanyProfile);