import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ModalBase from '../Modal/ModalBase';
import { ModalSize } from '../../enums/modalSize.enum';
import ModalPictureSelector from '../PictureSelector/ModalPictureSelector';

class NoPictureViewer extends Component<Props, State> {

    public readonly state: State = {
        showModal: false
    }

    async componentDidMount() {
    }


    async componentWillUnmount() {

    }

    private onPressCamera() {
        this.setState({ showModal: true });
    }

    private renderModal() {
        return (
            <ModalBase
                isVisible={this.state.showModal}
                onBackdropPress={this.onBackdropPressModal.bind(this)}
                title={"Choose"}
                closeButtonHide={false}
                needKeyboardAvoid={false}
                onClose={this.onCloseModal.bind(this)}
                backdropColor={SpontioColors.Black}
                backdropOpacity={0.15}
                size={ModalSize.Sm}
            >
                <View>
                    <ModalPictureSelector></ModalPictureSelector>
                </View>
            </ModalBase>
        );
    }

    private onCloseModal(): void {
        this.setState({ showModal: false });
    }

    private onBackdropPressModal(): void {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {this.renderModal()}
                <View style={styles.smileContainer}>
                    <FontAwesomeIcon style={styles.smile} icon="smile" size={scale(100)} color={SpontioColors.White} />
                </View>
                <View style={styles.cameraContainer}>
                    <TouchableOpacity onPress={this.onPressCamera.bind(this)}>
                        <FontAwesomeIcon style={styles.smile} icon="camera" size={scale(20)} color={SpontioColors.White} />
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
    smileContainer: {
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2,
        padding: moderateScale(10),
        marginHorizontal: moderateScale(15),
        marginVertical: moderateScale(0)
    },
    smile: {

    },
    cameraContainer: {
        alignSelf: 'center',
        borderRadius: 100,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2,
        padding: moderateScale(10),
        marginLeft: moderateScale(125),
    },
    camera: {

    }
});

interface IStateProps {

}

export interface OwnProps {
    picture: string;
}

type State = {
    showModal: boolean;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(NoPictureViewer); 