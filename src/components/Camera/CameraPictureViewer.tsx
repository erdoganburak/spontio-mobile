import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Camera } from '../../redux/reducer/cameraReducer';
import { AnyAction } from 'redux';
import { showCamera, changePicture, showTakenPicture } from '../../redux/actions/camera';
import { TRootReducer } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';
import NavigationManager from '../../managers/navigation.manager';

class CameraPictureViewer extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    close = async () => {
        this.props.changePicture(null);
        this.props.showTakenPicture(false);
    };

    ok = async () => {
        this.props.showTakenPicture(false);
        this.props.showCamera(false);
        NavigationManager.showHeader(true);
        this.props.onPictureSave();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.close.bind(this)} style={styles.closeIconContainer}>
                        <FontAwesomeIcon icon="times" size={scale(25)} color={SpontioColors.White} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.ok.bind(this)} style={styles.okIconContainer}>
                        <FontAwesomeIcon icon="check" size={scale(25)} color={SpontioColors.Primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: `data:image/gif;base64,${this.props.camera.picture}` }} />
                </View>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: SpontioColors.Black,
    },
    buttonContainer: {
        flex: 0.2,
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 1.8
    },
    image: {
        flex: 1
    },
    icon: {
        padding: moderateScale(15),
        paddingHorizontal: moderateScale(20),
    },
    closeIconContainer: {
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(20)
    },
    okIconContainer: {
        alignContent: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(20)
    },
}
);

interface IStateProps {
    camera: Camera,
    navigationProperty: NavigationProperty
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        camera: state.cameraReducer.camera,
        navigationProperty: state.navigationReducer.navigationProperty
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        showTakenPicture: (show: boolean) => dispatch(showTakenPicture(show)),
        changePicture: (picture: string) => dispatch(changePicture(picture))
    }
}

type State = {
    cameraType: any
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(CameraPictureViewer);