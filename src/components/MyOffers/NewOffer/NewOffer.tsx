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
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';
import { changeNewOfferPhoto } from '../../../redux/actions/newOffer';
import NewOfferTitle from './NewOfferTitle';
import NewOfferPhoto from './NewOfferPhoto';
import NewOfferDescription from './NewOfferProductDescription';
import NewOfferDescriptionOffer from './NewOfferDescription';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import OfferManager from '../../../managers/offer.manager';
import { CompanyOfferObject } from '../../../redux/reducer/companyOfferReducer';
import NewOfferSectors from './NewOfferSectors';
import NewOfferPrice from './NewOfferPrice';
import { OfferPriceType } from '../../../enums/offerPrice.enum';
import NewOfferAvailability from './NewOfferAvailability';

class NewOffer extends Component<Props, State> {

    private focusListener;

    public readonly state: State = {
        isEditMode: this.props.newOffer.newOfferTitle ? true : false
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
            this.props.changeNewOfferPhoto(this.props.camera.picture);
            this.props.showPictureSelectorModal(false);
        }
    }

    private onPressSave(): void {
        //if (!this.validateFields())
        //   return;
        if (this.state.isEditMode) {
            OfferManager.editCompanyOffer(this.createCompanyOfferObject());
        } else {
            OfferManager.addNewCompanyOffer(this.createCompanyOfferObject());
        }
        this.props.navigation.dispatch(StackActions.pop(1));
    }

    private createCompanyOfferObject(): CompanyOfferObject {
        let companyOffer: CompanyOfferObject = new CompanyOfferObject();
        // TODO Delete this line after endpoints implemented
        companyOffer.id = this.props.newOffer.id
        companyOffer.title = this.props.newOffer.newOfferTitle;
        companyOffer.offerPhoto = this.props.newOffer.newOfferPhoto;
        companyOffer.offerDescription = this.props.newOffer.newOfferDescription;
        companyOffer.productDescription = this.props.newOffer.newOfferProductDescription;
        companyOffer.offerSector = this.props.newOffer.newOfferSector;
        companyOffer.offerPriceType = this.props.newOffer.newOfferPriceType;
        if (this.props.newOffer.newOfferPriceType === OfferPriceType.Price) {
            companyOffer.offerNewPrice = this.props.newOffer.newOfferNewPrice;
            companyOffer.offerOldPrice = this.props.newOffer.newOfferOldPrice;
        }
        else if (this.props.newOffer.newOfferPriceType === OfferPriceType.Discount) {
            companyOffer.offerDiscount = this.props.newOffer.newOfferDiscount;
        }
        else if (this.props.newOffer.newOfferPriceType === OfferPriceType.Quota) {
            companyOffer.offerQuotaOldPrice = this.props.newOffer.newOfferQuotaOldPrice;
            companyOffer.offerQuotaNewPrice = this.props.newOffer.newOfferQuotaNewPrice;
        }
        companyOffer.offerStartDate = this.props.newOffer.newOfferStartDate;
        companyOffer.offerStartTime = this.props.newOffer.newOfferStartTime;
        companyOffer.offerEndDate = this.props.newOffer.newOfferEndDate;
        companyOffer.offerEndTime = this.props.newOffer.newOfferEndTime;
        return companyOffer;
    }

    private validateFields(): boolean {
        if (!this.props.newOffer.newOfferPhoto) {
            return false;
        } else if (!this.props.newOffer.newOfferDescription) {
            return false;
        } else if (!this.props.newOffer.newOfferProductDescription) {
            return false;
        } else if (!this.props.newOffer.newOfferTitle) {
            return false;
        } else if (!this.props.newOffer.newOfferSector) {
            return false;
        } else if (!this.props.newOffer.newOfferPriceType) {
            return false;
        }

        if (this.props.newOffer.newOfferPriceType === OfferPriceType.Price) {
            if (!this.props.newOffer.newOfferOldPrice || !this.props.newOffer.newOfferOldPrice)
                return false;
        }
        else if (this.props.newOffer.newOfferPriceType === OfferPriceType.Discount) {
            if (!this.props.newOffer.newOfferDiscount)
                return false;
        }
        else if (this.props.newOffer.newOfferPriceType === OfferPriceType.Quota) {
            if (!this.props.newOffer.newOfferQuotaOldPrice || !this.props.newOffer.newOfferQuotaNewPrice || !this.props.newOffer.newOfferQuota)
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
    newOffer: NewOfferObject
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
    changeNewOfferPhoto: (newOfferPhoto: string) => void
    showTakenPicture: (showTakenPicture: boolean) => void;
    changePicture: (picture: string) => void;
    showPictureSelectorModal: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        showCamera: (show: boolean) => dispatch(showCamera(show)),
        changeNewOfferPhoto: (newOfferPhoto: string) => dispatch(changeNewOfferPhoto(newOfferPhoto)),
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