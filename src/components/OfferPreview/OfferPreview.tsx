import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp, Route } from '@react-navigation/native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { User } from '../../redux/reducer/userReducer';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import { NewOfferObject } from '../../redux/reducer/newOfferReducer';
import { TRootReducer } from '../../redux/store';
import { CompanyOfferObject } from '../../redux/reducer/companyOfferReducer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import NavigationManager from '../../managers/navigation.manager';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from '../../managers/language.manager';
import OfferManager from '../../managers/offer.manager';

class OfferPreview extends Component<Props, State> {

    public readonly state: State = {

    }

    private focusListener;

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
    }

    async componentWillUnmount() {
        this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
    }

    private async handleFocus() {
        console.log("focused on offer preview");
        console.log(this.props.route.params)
        NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
    }

    private onPressEdit() {
        const offer = OfferManager.manageEditMode(this.props.route.params.offer);
        this.props.navigation.navigate(translate("navigation.new_offer"));
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPressEdit.bind(this)}>
                    <Text>
                        EDIT
                    </Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: this.props.route.params.offer.offerPhoto }} />
                </View>
                <View style={styles.offerInfoContainer}>
                    <Text style={styles.title}>
                        {this.props.route.params.offer.title}
                    </Text>
                    <Text style={styles.description}>
                        {this.props.route.params.offer.offerDescription}
                    </Text>
                </View>
                <View style={styles.offerDetailContainer}>
                    <Text style={styles.companyTitle}>
                        SpontioCompany
                    </Text>
                    <View style={styles.offerTimeContainer}>
                        <FontAwesomeIcon icon="clock" size={scale(20)} color={SpontioColors.Primary} />
                        <Text style={styles.offerTimeText}>
                            Ended
                        </Text>
                    </View>
                    <View style={styles.offerLocationContainer}>
                        <FontAwesomeIcon icon="map-marker-alt" size={scale(20)} color={SpontioColors.Primary} />
                        <Text style={styles.offerLocationText}>
                            Ankara
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SpontioColors.White
    },
    imageContainer: {
        flex: 1,
        alignSelf: 'center',
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateScale(12)
    },
    image: {
        width: moderateScale(320),
        height: moderateScale(320),
        resizeMode: "contain"

    },
    offerInfoContainer: {
        paddingHorizontal: moderateScale(8),
    },
    title: {
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateScale(5),
        fontSize: moderateScale(14),
        flex: 1,
        color: SpontioColors.Gray,
        fontWeight: 'bold'
    },
    description: {
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateScale(5),
        fontSize: moderateScale(14),
        flex: 1,
        color: SpontioColors.Gray,
    },
    offerDetailContainer: {
        paddingHorizontal: moderateScale(8),

    },
    companyTitle: {
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateScale(5),
        fontSize: moderateScale(14),
        flex: 1,
        color: SpontioColors.Gray,
        fontWeight: 'bold'
    },
    offerTimeContainer: {
        marginVertical: moderateScale(5),
        paddingHorizontal: moderateScale(5),
        flexDirection: 'row',
    },
    offerTimeText: {
        paddingHorizontal: moderateScale(5),
        fontSize: moderateScale(14),
        flex: 1,
        alignSelf: 'center',
        color: SpontioColors.Gray
    },
    offerLocationContainer: {
        marginVertical: moderateScale(5),
        paddingHorizontal: moderateScale(5),
        flexDirection: 'row'
    },
    offerLocationText: {
        paddingHorizontal: moderateScale(5),
        fontSize: moderateScale(14),
        flex: 1,
        alignSelf: 'center',
        color: SpontioColors.Gray
    }
});

interface IStateProps {
    user: User,
    navigationProperty: NavigationProperty,
    newOffer: NewOfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        navigationProperty: state.navigationReducer.navigationProperty,
        user: state.userReducer.user,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {

}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {

    }
}

export interface OwnProps {
    route: RouteProp<{ params: { offer: CompanyOfferObject } }, 'params'>
    navigation: NavigationProp<any>;
    companyOffer: CompanyOfferObject;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(OfferPreview);