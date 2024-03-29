import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { User } from '../../redux/reducer/userReducer';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import { TRootReducer } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { OfferObject } from '../../models/offerObject.model';
import { ThunkDispatch } from 'redux-thunk';

class Offer extends Component<Props, State> {

    public readonly state: State = {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${this.props.offer.photo}` }} />
                </View>
                <View style={styles.offerInfoContainer}>
                    <Text style={styles.title}>
                        {this.props.offer.title}
                    </Text>
                    <Text style={styles.description}>
                        {this.props.offer.offerDescription}
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
        flex:1,
        alignSelf: 'center',
        paddingHorizontal:moderateScale(5),
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
    navigationProperty: NavigationProperty
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        navigationProperty: state.navigationReducer.navigationProperty,
        user: state.userReducer.user
    }
}

interface IDispatchProps {

}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
    return {

    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
    offer: OfferObject;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Offer);