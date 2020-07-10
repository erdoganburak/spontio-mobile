import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ModalBase from '../Modal/ModalBase';
import { ModalSize } from '../../enums/modalSize.enum';
import ModalPictureSelector from '../PictureSelector/ModalPictureSelector';

class ProfilePictureViewer extends Component<Props, State> {

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
            <View style={styles.container}>
                <View>
                    {this.renderModal()}
                </View>

                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{ uri: `data:image/gif;base64,${this.props.picture}` }} />
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

}

export interface OwnProps {
    picture: string;
}

type State = {
    showModal: boolean;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(ProfilePictureViewer); 