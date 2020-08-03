import store from "../redux/store";
import { updateCompanyOfferList } from "../redux/actions/user";
import { Sector } from "../enums/sector.enum";
import { OfferPriceType } from "../enums/offerPrice.enum";
import HelperUtils from "../utils/helper.utils";
import { OfferObject } from "../models/offerObject.model";
import { changeOfferId, changeOfferPhoto, changeProductDescription, changeOfferDescription, changeTitle, changeOfferSector, changeOfferPriceType, changeOfferOldPrice, changeOfferNewPrice, changeOfferDiscount, changeOfferQuota, changeOfferQuotaOldPrice, changeOfferQuotaNewPrice, changeOfferStartDate, changeOfferStartTime, changeOfferEndDate, changeOfferEndTime, changeNewOfferObject } from "../redux/actions/newOffer";

const MAX_LIST_SIZE = 5;

class OfferManagerInstance {

	/**
  	* Adds new company offer to company offer list.
  	* 
  	* @param companyOffer New company offer.
  	*/
	public addNewCompanyOffer(companyOffer: OfferObject): void {
		let companyOfferList: Array<OfferObject> = store.getState().userReducer.user.companyOfferList;
		this.manageCompanyOfferList(companyOfferList);

		console.log("id: " + companyOffer.id);
		console.log("title: " + companyOffer.title);
		console.log("photo: " + companyOffer.photo);

		companyOfferList.push(companyOffer);
		store.dispatch(updateCompanyOfferList(companyOfferList));
		this.resetNewOffer();
	}

	/**
  	* Edits company offer from company offer list.
  	* 
  	* @param companyOffer Company offer.
  	*/
	public editCompanyOffer(companyOffer: OfferObject): void {
		let companyOfferList: Array<OfferObject> = store.getState().userReducer.user.companyOfferList;
		let offerToUpdateIndex = companyOfferList.findIndex(
			offer => offer.id === companyOffer.id);
		console.log("companyOffer.id: " + companyOffer.id)
		console.log("offerToUpdate: " + offerToUpdateIndex)
		if (offerToUpdateIndex != -1) {
			companyOfferList[offerToUpdateIndex] = companyOffer;
			store.dispatch(updateCompanyOfferList(companyOfferList));
		}
	}

	/**
  	* Delete company offer from company offer list.
  	* 
  	* @param companyOffer Company offer.
  	*/
	public deleteCompanyOffer(companyOffer: OfferObject): void {
		let companyOfferList: Array<OfferObject> = store.getState().userReducer.user.companyOfferList;
		let offerToDeleteIndex = companyOfferList.findIndex(
			offer => offer.id === companyOffer.id);
		if (offerToDeleteIndex > -1) {
			companyOfferList.splice(offerToDeleteIndex, 1);
			store.dispatch(updateCompanyOfferList(companyOfferList));
		}
	}

	/**
  	* Resets new offer object
  	* 
  	*/
	public resetNewOffer(): void {
		store.dispatch(changeOfferId(HelperUtils.generateGuid()))
		store.dispatch(changeOfferPhoto(null));
		store.dispatch(changeProductDescription(null));
		store.dispatch(changeOfferDescription(null));
		store.dispatch(changeTitle(null));
		store.dispatch(changeOfferSector(Sector.RestaurantCafeSnack));
		store.dispatch(changeOfferPriceType(OfferPriceType.Price));
		store.dispatch(changeOfferOldPrice(null));
		store.dispatch(changeOfferNewPrice(null));
		store.dispatch(changeOfferDiscount(null));
		store.dispatch(changeOfferQuota(null));
		store.dispatch(changeOfferQuotaOldPrice(null));
		store.dispatch(changeOfferQuotaNewPrice(null));
		store.dispatch(changeOfferStartDate(new Date()));
		store.dispatch(changeOfferStartTime(new Date()));
		store.dispatch(changeOfferEndDate(new Date()));
		store.dispatch(changeOfferEndTime(new Date()));
	}

	/**
	* Updated redux for edit mode
	* 
	* @param offerObject offer.
	*/
	public manageEditMode(offerObject: OfferObject) {
		store.dispatch(changeNewOfferObject(offerObject));
	}

	private manageCompanyOfferList(companyOfferList: Array<OfferObject>): void {
		if (companyOfferList.length >= MAX_LIST_SIZE) {
			companyOfferList.shift();
		}
	}

}

const OfferManager = new OfferManagerInstance();
export default OfferManager;
