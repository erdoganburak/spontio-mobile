import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { Camera } from '../../redux/reducer/cameraReducer';
import { AnyAction } from 'redux';
import { showCamera, changePicture, showTakenPicture } from '../../redux/actions/camera';
import { TRootReducer } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CameraPictureViewer from './CameraPictureViewer';
import NavigationManager from '../../managers/navigation.manager';
import { ThunkDispatch } from 'redux-thunk';

class CameraComponent extends Component<Props, State> {

    private camera: RNCamera;

    public readonly state: State = {
        cameraType: RNCamera.Constants.Type.front,
        flashMode: RNCamera.Constants.FlashMode.off
    }

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    renderCamera() {
        const isFocused = this.props.navigation.isFocused();

        if (!isFocused) {
            return null;
        } else if (isFocused) {
            return (
                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    flashMode={this.state.flashMode}
                    playSoundOnCapture={true}
                    captureAudio={false}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                />
            )
        }
    }

    render() {
        if (this.props.camera.showTakenPicture) {
            return (
                <View style={styles.cameraPictureViewerContainer}>
                    <CameraPictureViewer onPictureSave={() => this.props.onPictureSave()}></CameraPictureViewer>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    {this.renderCamera()}
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.close.bind(this)} style={styles.close}>
                            <FontAwesomeIcon color={SpontioColors.White} icon="times" size={scale(25)} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.snapContainer}>
                        <View style={styles.flashWrapper}>
                            {this.state.cameraType == RNCamera.Constants.Type.back
                                ?
                                (
                                    <TouchableOpacity onPress={this.manageFlash.bind(this)} style={styles.flashCamera}>
                                        <FontAwesomeIcon color={this.state.flashMode == RNCamera.Constants.FlashMode.off ? SpontioColors.White : SpontioColors.Yellow} icon="bolt" size={scale(20)} />
                                    </TouchableOpacity>
                                ) :
                                (
                                    <View style={styles.flashCamera}>
                                        <FontAwesomeIcon color={SpontioColors.Gray} icon="bolt" size={scale(20)} />
                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.captureWrapper}>
                            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.swapCameraWrapper}>
                            <TouchableOpacity onPress={this.swapCamera.bind(this)} style={styles.swapCamera}>
                                <FontAwesomeIcon color={SpontioColors.White} icon="sync-alt" size={scale(20)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            );
        }
    }

    takePicture = async () => {
        if (this.camera) {
            let _mirrorImage: boolean = false;
            if (this.state.cameraType == RNCamera.Constants.Type.front) {
                _mirrorImage = true;
            }
            const options = { quality: 0.5, base64: true, mirrorImage: _mirrorImage };
            try {
                const data = await this.camera.takePictureAsync(options);
                this.props.changePicture(data.base64);
                this.props.showTakenPicture(true);
            } catch (error) {
                console.log("Error occured while capturing picture => " + error);
            }

        }
    };

    close = async () => {
        this.props.showCamera(false);
        NavigationManager.showHeader(true);
    };

    swapCamera = async () => {
        if (this.state.cameraType == RNCamera.Constants.Type.front)
            this.setState({ cameraType: RNCamera.Constants.Type.back })
        else
            this.setState({ cameraType: RNCamera.Constants.Type.front })
    };

    manageFlash = async () => {
        if (this.state.flashMode == RNCamera.Constants.FlashMode.off)
            this.setState({ flashMode: RNCamera.Constants.FlashMode.torch })
        else
            this.setState({ flashMode: RNCamera.Constants.FlashMode.off })
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    snapContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'flex-start',
    },
    captureWrapper: {
        backgroundColor: SpontioColors.Primary,
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2,
        padding: moderateScale(8),
        alignSelf: 'center',
        margin: moderateScale(20),
    },
    capture: {
        backgroundColor: SpontioColors.White,
        borderRadius: 100,
        padding: moderateScale(30),
        alignSelf: 'center',
    },
    close: {
        flex: 0,
        borderRadius: 5,
        padding: moderateScale(15),
        paddingHorizontal: moderateScale(20),
        alignSelf: 'center',
    },
    swapCameraWrapper: {
        backgroundColor: SpontioColors.Transparent,
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2,
        padding: moderateScale(8),
        alignSelf: 'center',
        margin: moderateScale(20),
    },
    swapCamera: {

    },
    flashWrapper: {
        backgroundColor: SpontioColors.Transparent,
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2,
        padding: moderateScale(8),
        alignSelf: 'center',
        margin: moderateScale(20),
    },
    flashCamera: {

    },
    cameraPictureViewerContainer: {
        flex: 1
    }
}
);

interface IStateProps {
    camera: Camera,
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        camera: state.cameraReducer.camera,
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
    onPictureSave: () => void;
}

interface IDispatchProps {
    showCamera: (show: boolean) => void;
    showTakenPicture: (showTakenPicture: boolean) => void;
    changePicture: (picture: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        showTakenPicture: (show: boolean) => dispatch(showTakenPicture(show)),
        changePicture: (picture: string) => dispatch(changePicture(picture))
    }
}

type State = {
    cameraType: any,
    flashMode: any
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(CameraComponent);