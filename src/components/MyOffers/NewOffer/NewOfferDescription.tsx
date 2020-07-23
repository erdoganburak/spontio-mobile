import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';
import { changeNewOfferDescription } from '../../../redux/actions/newOffer';

class NewOfferDescription extends Component<Props, State> {

    public readonly state: State = {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Tell us about your offer...
                    </Text>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType="default"
                            placeholder={"Offer Description"}
                            placeholderTextColor={SpontioColors.Primary}
                            style={styles.input}
                            returnKeyType="default"
                            value={this.props.newOffer.newOfferDescription}
                            onChangeText={(newOfferDescription) => this.props.changeNewOfferDescription(newOfferDescription)}
                        />
                    </View>
                </View>
            </View>

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
    changeNewOfferDescription: (newOfferDescription: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changeNewOfferDescription: (newOfferDescription: string) => dispatch(changeNewOfferDescription(newOfferDescription)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferDescription);