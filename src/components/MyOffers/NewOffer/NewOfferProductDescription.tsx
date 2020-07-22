import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { showCamera } from '../../../redux/actions/camera';
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';

class NewOfferProductDescription extends Component<Props, State> {

    public readonly state: State = {

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Tell us about your product...
                    </Text>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType="default"
                            placeholder={"Product Description"}
                            placeholderTextColor={SpontioColors.Primary}
                            style={styles.input}
                            returnKeyType="default"
                        //value={this.props.user.username}
                        //onChangeText={(username) => this.props.changeUsername(username)}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: SpontioColors.DarkWhite,
    },
    box: {
        backgroundColor: SpontioColors.White,
        marginVertical: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: 'bold'
    },
    content: {
        padding: moderateScale(20),
        justifyContent: 'center'
    },
    input: {
        paddingVertical: moderateScale(10),
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: SpontioColors.Primary,
        borderStyle: 'solid',
        fontSize: moderateScale(16)
    }
});

interface IStateProps {
    navigationProperty: NavigationProperty,
    newOffer: NewOfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        navigationProperty: state.navigationReducer.navigationProperty,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {
    showCamera: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferProductDescription);