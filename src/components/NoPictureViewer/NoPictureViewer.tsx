import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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

class NoPictureViewer extends Component<Props, State> {

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
            <View style={styles.wrapper}>
                {this.renderModal()}
                <View style={styles.cameraContainer}>
                    <TouchableOpacity onPress={this.onPressCamera.bind(this)}>
                        <FontAwesomeIcon icon="camera" size={scale(70)} color={SpontioColors.White} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraContainer: {
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2,
        padding: moderateScale(30),
        marginHorizontal: moderateScale(15),
        marginVertical: moderateScale(0)
    }
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

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NoPictureViewer);