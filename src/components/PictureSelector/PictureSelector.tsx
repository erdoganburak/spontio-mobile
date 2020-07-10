import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import ModalBase from '../Modal/ModalBase';
import ModalPictureSelector from './ModalPictureSelector';
import { ModalSize } from '../../enums/modalSize.enum';
import ProfilePictureViewer from '../ProfilePictureViewer/ProfilePictureViewer';
import NoPictureViewer from '../NoPictureViewer/NoPictureViewer';
import { NavigationProp } from '@react-navigation/native';
import { changePicture } from '../../redux/actions/gallery';
import { AnyAction } from 'redux';
import { TRootReducer } from '../../redux/store';
import { Gallery } from '../../redux/reducer/galleryReducer';

class PictureSelector extends Component<Props, State> {

    public readonly state: State = {
        showModal: false
    }

    async componentDidMount() {
    }


    async componentWillUnmount() {

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

                {this.props.picture ?
                    (
                        <ProfilePictureViewer picture={this.props.picture}></ProfilePictureViewer>
                    )
                    :
                    (
                        <NoPictureViewer ></NoPictureViewer>
                    )
                }

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SpontioColors.Primary
    }
});

interface IStateProps {
    gallery: Gallery
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        gallery: state.galleryReducer.gallery
    }
}

interface IDispatchProps {
    changePicture: (picture: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changePicture: (picture: string) => dispatch(changePicture(picture))
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
    picture: string,
}

type State = {
    showModal: boolean;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(PictureSelector);