import React, { Component, Dispatch } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { changePicture, showGallery } from '../../redux/actions/gallery';
import { TRootReducer } from '../../redux/store';
import ImagePicker from 'react-native-image-picker';
import { Gallery } from '../../redux/reducer/galleryReducer';

class GalleryComponent extends Component<Props, State> {

    public readonly state: State = {

    }

    async componentDidMount() {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        // Open Image Library
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.props.showGallery(false);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.props.showGallery(false);
            } else {
                this.props.showGallery(false);
                this.props.changePicture(response.data);
                this.props.onPictureSaveFromGallery();

            }
        });
    }

    async componentWillUnmount() {

    }

    render() {
        return (
            <View></View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
}
);

interface IStateProps {
    gallery: Gallery,
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        gallery: state.galleryReducer.gallery,
    }
}

export interface OwnProps {
    onPictureSaveFromGallery: () => void;
}

interface IDispatchProps {
    changePicture: (picture: string) => void;
    showGallery: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changePicture: (picture: string) => dispatch(changePicture(picture)),
        showGallery: (show: boolean) => dispatch(showGallery(show))
    }
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(GalleryComponent);