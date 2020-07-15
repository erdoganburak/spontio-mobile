import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ModalBase, { IProps } from '../Modal/ModalBase';
import { ModalSize } from '../../enums/modalSize.enum';
import ModalPictureSelector from '../PictureSelector/ModalPictureSelector';
import { TRootReducer } from '../../redux/store';
import { AnyAction } from 'redux';
import { PictureSelectorObject } from '../../redux/reducer/pictureSelectorReducer';
import { showPictureSelectorModal } from '../../redux/actions/pictureSelector';

class ProfilePictureViewer extends Component<Props, State> {

    public readonly state: State = {

    }

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    private onPressCamera() {
        this.props.showPictureSelectorModal(true);
    }

    private renderModal() {

        const _modalProps: IProps = {
            isVisible: this.props.pictureSelector.showPictureSelectorModal,
            onBackdropPress: this.onBackdropPressModal.bind(this),
            title: "Choose",
            closeButtonHide: false,
            needKeyboardAvoid: false,
            onClose: this.onCloseModal.bind(this),
            backdropColor: SpontioColors.Black,
            backdropOpacity: 0.15,
            size: ModalSize.Sm,
        }

        return (
            <ModalBase
                modalProps={_modalProps}
            >
                <View>
                    <ModalPictureSelector></ModalPictureSelector>
                </View>
            </ModalBase>
        );
    }

    private onCloseModal(): void {
        this.props.showPictureSelectorModal(false);
    }

    private onBackdropPressModal(): void {
        this.props.showPictureSelectorModal(false);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.renderModal()}
                </View>

                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{ uri: this.props.picture }} />
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.cameraContainer} onPress={this.onPressCamera.bind(this)}>
                        <FontAwesomeIcon style={styles.camera} icon="camera" size={scale(20)} color={SpontioColors.White} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SpontioColors.Primary
    },
    buttonWrapper: {
        flex: 0.5,
        justifyContent: 'center',
        paddingLeft: moderateScale(150)
    },
    imageWrapper: {
        flex: 1.5,
        alignSelf: 'center'
    },
    cameraContainer: {
        alignSelf: 'center',
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 4,
        padding: moderateScale(10),
        backgroundColor: SpontioColors.Primary,
    },
    camera: {

    },
    image: {
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 4,
        width: moderateScale(200),
        height: moderateScale(200),
        borderRadius: moderateScale(200 / 2),
    },
});

interface IStateProps {
    pictureSelector: PictureSelectorObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        pictureSelector: state.pictureSelectorReducer.pictureSelectorObject
    }
}

export interface OwnProps {
    picture: string,
}

interface IDispatchProps {
    showPictureSelectorModal: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showPictureSelectorModal: (show: boolean) => dispatch(showPictureSelectorModal(show)),
    }
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ProfilePictureViewer);