import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { showCamera, showTakenPicture, changePicture } from '../../..//redux/actions/camera';
import { showPictureSelectorModal } from '../../..//redux/actions/pictureSelector';
import { Camera } from '../../..//redux/reducer/cameraReducer';
import CameraComponent from '../../../components/Camera/CameraComponent';
import PictureSelector from '../../../components/PictureSelector/PictureSelector';
import { User } from '../../../redux/reducer/userReducer';
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';
import { changeNewOfferPhoto } from '../../../redux/actions/newOffer';

class NewOfferPhoto extends Component<Props, State> {

    private focusListener;

    public readonly state: State = {

    }

    public onPictureSave() {
        if (this.props.camera.picture) {
            this.props.changeNewOfferPhoto(this.props.camera.picture);
            this.props.showPictureSelectorModal(false);
        }
    }

    render() {
        if (this.props.camera.showCamera)
            return (
                <CameraComponent navigation={this.props.navigation} onPictureSave={this.props.onPictureSave.bind(this)}></CameraComponent>
            );
        return (
            <View style={styles.container}>
                    <View style={styles.box}>
                        <View style={styles.content}>
                            <Text style={styles.title}>
                                Add some photos
                            </Text>
                            <View style={styles.pictureSelectorContainer}>
                                <PictureSelector picture={this.props.newOffer.newOfferPhoto}></PictureSelector>
                            </View>
                        </View>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: SpontioColors.DarkWhite,
    },
    scrollView: {
        width: '90%',
    },
    box: {
        backgroundColor: SpontioColors.White,
        marginVertical: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: 'bold'
    },
    content: {
        padding: moderateScale(20),
        justifyContent: 'center'
    },
    pictureSelectorContainer: {
        paddingVertical: moderateScale(15)
    },
});

interface IStateProps {
    camera: Camera,
    user: User,
    navigationProperty: NavigationProperty,
    newOffer: NewOfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        camera: state.cameraReducer.camera,
        navigationProperty: state.navigationReducer.navigationProperty,
        user: state.userReducer.user,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {
    showCamera: (show: boolean) => void;
    changeNewOfferPhoto: (newOfferPhoto: string) => void
    showTakenPicture: (showTakenPicture: boolean) => void;
    changePicture: (picture: string) => void;
    showPictureSelectorModal: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        changeNewOfferPhoto: (newOfferPhoto: string) => dispatch(changeNewOfferPhoto(newOfferPhoto)),
        showTakenPicture: (show: boolean) => dispatch(showTakenPicture(show)),
        changePicture: (picture: string) => dispatch(changePicture(picture)),
        showPictureSelectorModal: (show: boolean) => dispatch(showPictureSelectorModal(show)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
    onPictureSave: () => void;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferPhoto);