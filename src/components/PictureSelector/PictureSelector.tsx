import React, { Component, Dispatch } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { connect } from 'react-redux';
import ProfilePictureViewer from '../ProfilePictureViewer/ProfilePictureViewer';
import NoPictureViewer from '../NoPictureViewer/NoPictureViewer';
import { NavigationProp } from '@react-navigation/native';
import { AnyAction } from 'redux';
import { TRootReducer } from '../../redux/store';
import { PictureSelectorObject } from '../../redux/reducer/pictureSelectorReducer';
import { showPictureSelectorModal } from '../../redux/actions/pictureSelector';

class PictureSelector extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.picture ?
                    (
                        <ProfilePictureViewer picture={this.props.picture}></ProfilePictureViewer>
                    )
                    :
                    (
                        <NoPictureViewer></NoPictureViewer>
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
    pictureSelector: PictureSelectorObject 
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        pictureSelector: state.pictureSelectorReducer.pictureSelectorObject
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
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

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(PictureSelector);