import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../redux/store';
import { User } from '../../redux/reducer/userReducer';
import { SpontioColors } from '../../enums/spontioColors.enum';
import NavigationManager from '../../managers/navigation.manager';
import { translate } from '../../managers/language.manager';
import { AnyAction } from 'redux';
import { changeNewOfferPhoto } from '../../redux/actions/newOffer';
import ButtonNewOffer from '../Button/ButtonNewOffer';

class MyOffers extends Component<Props, State> {

    private focusListener;

    public readonly state: State = {

    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
    }

    async componentWillUnmount() {
        this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
    }

    private async handleFocus() {
        console.log("focused on my offers");
        NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonNewOffer}>
                    <ButtonNewOffer onPress={this.onPressNewOffer.bind(this)}></ButtonNewOffer>
                </View>
            </View>
        );
    }

    private onPressNewOffer() {
        this.props.changeNewOfferPhoto(null);
        this.props.navigation.navigate(translate("navigation.new_offer"));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonNewOffer: {
        position: 'absolute',
        bottom: moderateScale(10),
        right: moderateScale(10),
    }
});

interface IStateProps {
    user: User,
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        user: state.userReducer.user,
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

interface IDispatchProps {
    changeNewOfferPhoto: (newOfferPhoto: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changeNewOfferPhoto: (newOfferPhoto: string) => dispatch(changeNewOfferPhoto(newOfferPhoto)),
    }
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(MyOffers);