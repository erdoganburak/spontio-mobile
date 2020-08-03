import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp, StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import NavigationManager from '../../../managers/navigation.manager';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { showCamera, showTakenPicture, changePicture } from '../../..//redux/actions/camera';
import { showPictureSelectorModal } from '../../..//redux/actions/pictureSelector';
import { Camera } from '../../..//redux/reducer/cameraReducer';
import CameraManager from '../../../managers/camera.manager';
import CameraComponent from '../../../components/Camera/CameraComponent';
import { User } from '../../../redux/reducer/userReducer';
import NewOfferTitle from './NewOfferTitle';
import NewOfferPhoto from './NewOfferPhoto';
import NewOfferDescription from './NewOfferProductDescription';
import NewOfferDescriptionOffer from './NewOfferDescription';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import OfferManager from '../../../managers/offer.manager';
import NewOfferSectors from './NewOfferSectors';
import NewOfferPrice from './NewOfferPrice';
import { OfferPriceType } from '../../../enums/offerPrice.enum';
import NewOfferAvailability from './NewOfferAvailability';
import { OfferObject } from '../../../models/offerObject.model';
import { changeOfferPhoto } from '../../../redux/actions/newOffer';

class NewOffer extends Component<Props, State> {

    private focusListener;

    public readonly state: State = {
        isEditMode: this.props.newOffer.title ? true : false
    }

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
    }

    async componentWillUnmount() {
        this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
    }

    private async handleFocus() {
        console.log("focused on new offer");
        if (this.props.camera.showCamera || this.props.camera.showTakenPicture) {
            CameraManager.resetCamera();
        }
        NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
    }

    private onPictureSave(): void {
        if (this.props.camera.picture) {
            this.props.changeOfferPhoto(this.props.camera.picture);
            this.props.showPictureSelectorModal(false);
        }
    }

    private onPressSave(): void {
        //if (!this.validateFields())
        //   return;
        if (this.state.isEditMode) {
            OfferManager.editCompanyOffer(this.createOfferObject());
            console.log("editing")
            this.props.navigation.dispatch(StackActions.pop(2));

        } else {
            OfferManager.addNewCompanyOffer(this.createOfferObject());
            console.log("inserting")
            this.props.navigation.dispatch(StackActions.pop(1));

        }
    }

    private createOfferObject(): OfferObject {
        let companyOffer: OfferObject = new OfferObject();
        // TODO Delete this line after endpoints implemented
        companyOffer.id = this.props.newOffer.id
        
        companyOffer.title = this.props.newOffer.title;
        companyOffer.photo = this.props.newOffer.photo;
        companyOffer.offerDescription = this.props.newOffer.offerDescription;
        companyOffer.productDescription = this.props.newOffer.productDescription;
        companyOffer.sector = this.props.newOffer.sector;
        companyOffer.priceType = this.props.newOffer.priceType;
        if (this.props.newOffer.priceType === OfferPriceType.Price) {
            companyOffer.newPrice = this.props.newOffer.newPrice;
            companyOffer.oldPrice = this.props.newOffer.oldPrice;
        }
        else if (this.props.newOffer.priceType === OfferPriceType.Discount) {
            companyOffer.discount = this.props.newOffer.discount;
        }
        else if (this.props.newOffer.priceType === OfferPriceType.Quota) {
            companyOffer.quotaOldPrice = this.props.newOffer.quotaOldPrice;
            companyOffer.quotaNewPrice = this.props.newOffer.quotaNewPrice;
        }
        companyOffer.startDate = this.props.newOffer.startDate;
        companyOffer.startTime = this.props.newOffer.startTime;
        companyOffer.endDate = this.props.newOffer.endDate;
        companyOffer.endTime = this.props.newOffer.endTime;
        return companyOffer;
    }

    private validateFields(): boolean {
        if (!this.props.newOffer.photo) {
            return false;
        } else if (!this.props.newOffer.offerDescription) {
            return false;
        } else if (!this.props.newOffer.productDescription) {
            return false;
        } else if (!this.props.newOffer.title) {
            return false;
        } else if (!this.props.newOffer.sector) {
            return false;
        } else if (!this.props.newOffer.priceType) {
            return false;
        }

        if (this.props.newOffer.priceType === OfferPriceType.Price) {
            if (!this.props.newOffer.oldPrice || !this.props.newOffer.newPrice)
                return false;
        }
        else if (this.props.newOffer.priceType === OfferPriceType.Discount) {
            if (!this.props.newOffer.discount)
                return false;
        }
        else if (this.props.newOffer.priceType === OfferPriceType.Quota) {
            if (!this.props.newOffer.oldPrice || !this.props.newOffer.newPrice || !this.props.newOffer.quota)
                return false;
        }
        return true;
    }

    render() {
        if (this.props.camera.showCamera)
            return (
                <CameraComponent navigation={this.props.navigation} onPictureSave={this.onPictureSave.bind(this)}></CameraComponent>
            );
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={moderateScale(100)}
            >
                <ScrollView style={styles.scrollView}>
                    <NewOfferPhoto onPictureSave={() => this.onPictureSave.bind(this)}></NewOfferPhoto>
                    <NewOfferTitle></NewOfferTitle>
                    <NewOfferDescription></NewOfferDescription>
                    <NewOfferDescriptionOffer></NewOfferDescriptionOffer>
                    <NewOfferSectors></NewOfferSectors>
                    <NewOfferPrice></NewOfferPrice>
                    <NewOfferAvailability></NewOfferAvailability>
                    <View style={styles.buttonSave}>
                        <ButtonPrimary title={"Save"} onPress={this.onPressSave.bind(this)}></ButtonPrimary>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SpontioColors.DarkWhite,
        alignItems: 'center',
        marginVertical: moderateScale(10)
    },
    scrollView: {
        width: '98%',
        paddingHorizontal: moderateScale(15)
    },
    buttonSave: {
        alignSelf: 'center',
        paddingVertical: moderateScale(10)
    }
});

interface IStateProps {
    camera: Camera,
    user: User,
    navigationProperty: NavigationProperty,
    newOffer: OfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        camera: state.cameraReducer.camera,
        navigationProperty: state.navigationReducer.navigationProperty,
        user: state.userReducer.user,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {
    showCamera: (show: boolean) => void;
    changeOfferPhoto: (photo: string) => void
    showTakenPicture: (showTakenPicture: boolean) => void;
    changePicture: (picture: string) => void;
    showPictureSelectorModal: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        changeOfferPhoto: (photo: string) => dispatch(changeOfferPhoto(photo)),
        showTakenPicture: (show: boolean) => dispatch(showTakenPicture(show)),
        changePicture: (picture: string) => dispatch(changePicture(picture)),
        showPictureSelectorModal: (show: boolean) => dispatch(showPictureSelectorModal(show)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {
    isEditMode: boolean;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOffer);