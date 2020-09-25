import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp, Route, StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { User } from '../../redux/reducer/userReducer';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import { TRootReducer } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import NavigationManager from '../../managers/navigation.manager';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from '../../managers/language.manager';
import OfferManager from '../../managers/offer.manager';
import { OfferObject } from '../../models/offerObject.model';
import DeleteOffer from './DeleteOffer';
import ModalBase from '../Modal/ModalBase';
import { ModalSize } from '../../enums/modalSize.enum';

class OfferPreview extends Component<Props, State> {

    public readonly state: State = {
        showModal: false
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

    private onPressDelete() {
        this.setState({ showModal: true });
    }

    private onPressYes() {
        OfferManager.deleteCompanyOffer(this.props.route.params.offer);
        setTimeout(() => {
            this.setState({ showModal: false });
            this.props.navigation.dispatch(StackActions.pop(1));
        }, 1000)

    }

    private onPressNo() {
        this.setState({ showModal: false });
    }

    private renderModal() {
        const _modalProps: IProps = {
            isVisible: this.state.showModal,
            onBackdropPress: this.onBackdropPressModal.bind(this),
            title: "Delete Offer",
            closeButtonHide: false,
            needKeyboardAvoid: false,
            onClose: this.onCloseModal.bind(this),
            backdropColor: SpontioColors.Black,
            backdropOpacity: 0.15,
            size: ModalSize.Sm
        }
        return (
            <ModalBase
                modalProps={_modalProps}
            >
                <View>
                    <DeleteOffer onPressYes={this.onPressYes.bind(this)} onPressNo={this.onPressNo.bind(this)}></DeleteOffer>
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
                {this.renderModal()}
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={this.onPressDelete.bind(this)}>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon="trash" size={scale(24)} color={SpontioColors.Primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressEdit.bind(this)}>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon="edit" size={scale(24)} color={SpontioColors.Primary} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.imageContainer}>

                        <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${this.props.route.params.offer.photo}` }} />
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
        paddingHorizontal: moderateScale(8)
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
    },
    actionContainer: {
        flexDirection: 'row',
        padding: moderateScale(20),
        alignSelf: 'flex-end'
    },
    body: {
        flex: 1
    },
    iconContainer: {
        paddingHorizontal: moderateScale(8)
    }
});

interface IStateProps {
    user: User,
    navigationProperty: NavigationProperty,
    newOffer: OfferObject
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
    route: RouteProp<{ params: { offer: OfferObject } }, 'params'>
    navigation: NavigationProp<any>;
    offer: OfferObject;
}

type State = {
    showModal: boolean;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(OfferPreview);