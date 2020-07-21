import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AnyAction } from 'redux';
import { showCamera, } from '../../redux/actions/camera';
import { TRootReducer } from '../../redux/store';
import { Camera } from '../../redux/reducer/cameraReducer';
import NavigationManager from '../../managers/navigation.manager';
import { User } from '../../redux/reducer/userReducer';
import { showPictureSelectorModal } from '../../redux/actions/pictureSelector';
import { PictureSelectorObject } from '../../redux/reducer/pictureSelectorReducer';
import GalleryManager from '../../managers/gallery.manager';
import { Session } from 'src/redux/reducer/sessionReducer';

class ModalPictureSelector extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    private onPressCamera() {
        this.props.showCamera(true);
        this.props.showPictureSelectorModal(false);
        NavigationManager.showHeader(false);
    }

    private onPressGallery() {
        GalleryManager.openImagePicker();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={this.onPressCamera.bind(this)} style={styles.containerCamera}>
                        <View style={styles.camera}>
                            <FontAwesomeIcon icon="camera" size={scale(40)} color={SpontioColors.White} />
                        </View>
                        <Text style={styles.cameraText}>
                            Camera
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressGallery.bind(this)} style={styles.containerGallery}>
                        <View style={styles.gallery}>
                            <FontAwesomeIcon icon="file-image" size={scale(40)} color={SpontioColors.Primary} />
                        </View>
                        <Text style={styles.galleryText}>
                            Gallery
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: moderateScale(20),
        height: '100%'
    },
    wrapper: {
        flex: 1,
    },
    containerCamera: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: SpontioColors.Primary
    },
    containerGallery: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: SpontioColors.DarkWhite
    },
    camera: {
        paddingHorizontal: moderateScale(30)
    },
    cameraText: {
        color: SpontioColors.White,
        fontSize: moderateScale(14),
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    gallery: {
        paddingHorizontal: moderateScale(30)
    },
    galleryText: {
        color: SpontioColors.Black,
        fontSize: moderateScale(14),
        fontWeight: 'bold'
    }
});

interface IStateProps {
    camera: Camera,
    user: User,
    pictureSelector: PictureSelectorObject,
    session: Session
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        camera: state.cameraReducer.camera,
        user: state.userReducer.user,
        pictureSelector: state.pictureSelectorReducer.pictureSelectorObject,
        session: state.sessionReducer.session
    }
}

export interface OwnProps {

}

interface IDispatchProps {
    showCamera: (show: boolean) => void;
    showPictureSelectorModal: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        showPictureSelectorModal: (show: boolean) => dispatch(showPictureSelectorModal(show)),
    }
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ModalPictureSelector);