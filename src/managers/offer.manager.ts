import { CompanyOfferObject } from "../redux/reducer/companyOfferReducer";
import store from "../redux/store";
import { updateCompanyOfferList } from "../redux/actions/user";
import { changeNewOfferPhoto, changeNewOfferDescription, changeNewOfferProductDescription, changeNewOfferTitle, changeNewOfferSector, changeNewOfferPriceType, changeNewOfferOldPrice, changeNewOfferNewPrice, changeNewOfferDiscount, changeNewOfferQuota, changeNewOfferQuotaOldPrice, changeNewOfferQuotaNewPrice, changeNewOfferStartDate, changeNewOfferStartTime, changeNewOfferEndDate, changeNewOfferEndTime, changeNewOfferObject, changeNewOfferId } from "../redux/actions/newOffer";
import { Sector } from "../enums/sector.enum";
import { OfferPriceType } from "../enums/offerPrice.enum";
import { NewOfferObject } from "../redux/reducer/newOfferReducer";
import HelperUtils from "../utils/helper.utils";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const MAX_LIST_SIZE = 5;

class OfferManagerInstance {

	/**
  	* Adds new company offer to company offer list.
  	* 
  	* @param companyOffer New company offer.
  	*/
	public addNewCompanyOffer(companyOffer: CompanyOfferObject): void {
		let companyOfferList: Array<CompanyOfferObject> = store.getState().userReducer.user.companyOfferList;
		this.manageCompanyOfferList(companyOfferList);
		companyOfferList.push(companyOffer);
		store.dispatch(updateCompanyOfferList(companyOfferList));
		this.resetNewOffer();
	}

	/**
  	* Edits company offer from company offer list.
  	* 
  	* @param companyOffer Company offer.
  	*/
	public editCompanyOffer(companyOffer: CompanyOfferObject): void {
		let companyOfferList: Array<CompanyOfferObject> = store.getState().userReducer.user.companyOfferList;
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
	public deleteCompanyOffer(companyOffer: CompanyOfferObject): void {
		/*let companyOfferList: Array<CompanyOfferObject> = store.getState().userReducer.user.companyOfferList;
		let offerToDelete = companyOfferList.find(
			offer => offer.id === companyOffer.id);
		if (offerToDelete) {
			offerToUpdate = companyOffer;
			store.dispatch(updateCompanyOfferList(companyOfferList));
		}*/
	}

	/**
  	* Resets new offer object
  	* 
  	*/
	public resetNewOffer(): void {
		store.dispatch(changeNewOfferId(HelperUtils.generateGuid()))
		store.dispatch(changeNewOfferPhoto(null));
		store.dispatch(changeNewOfferDescription(null));
		store.dispatch(changeNewOfferProductDescription(null));
		store.dispatch(changeNewOfferTitle(null));
		store.dispatch(changeNewOfferSector(Sector.RestaurantCafeSnack));
		store.dispatch(changeNewOfferPriceType(OfferPriceType.Price));
		store.dispatch(changeNewOfferOldPrice(null));
		store.dispatch(changeNewOfferNewPrice(null));
		store.dispatch(changeNewOfferDiscount(null));
		store.dispatch(changeNewOfferQuota(null));
		store.dispatch(changeNewOfferQuotaOldPrice(null));
		store.dispatch(changeNewOfferQuotaNewPrice(null));
		store.dispatch(changeNewOfferStartDate(new Date()));
		store.dispatch(changeNewOfferStartTime(new Date()));
		store.dispatch(changeNewOfferEndDate(new Date()));
		store.dispatch(changeNewOfferEndTime(new Date()));
	}

	/**
	* Updated redux for edit mode
	* 
	* @param offerObject offer.
	*/
	public manageEditMode(offerObject: CompanyOfferObject) {
		store.dispatch(changeNewOfferObject(this.convertOfferObjectToNewOfferObject(offerObject)));
	}

	/**
	* Converts offer object to new offer object for editing.
	* 
	* @param offerObject offer.
	*/
	convertOfferObjectToNewOfferObject(offerObject: CompanyOfferObject): NewOfferObject {
		let newOffer: NewOfferObject = new NewOfferObject();
		newOffer.id = offerObject.id;
		newOffer.newOfferPhoto = offerObject.offerPhoto;
		newOffer.newOfferDescription = offerObject.offerDescription;
		newOffer.newOfferProductDescription = offerObject.productDescription;
		newOffer.newOfferTitle = offerObject.title;
		newOffer.newOfferSector = offerObject.offerSector;
		newOffer.newOfferPriceType = offerObject.offerPriceType;
		newOffer.newOfferOldPrice = offerObject.offerOldPrice;
		newOffer.newOfferNewPrice = offerObject.offerNewPrice;
		newOffer.newOfferDiscount = offerObject.offerDiscount;
		newOffer.newOfferQuota = offerObject.offerQuota;
		newOffer.newOfferQuotaOldPrice = offerObject.offerQuotaOldPrice;
		newOffer.newOfferQuotaNewPrice = offerObject.offerQuotaNewPrice;
		newOffer.newOfferStartDate = offerObject.offerStartDate;
		newOffer.newOfferStartTime = offerObject.offerStartTime;
		newOffer.newOfferEndDate = offerObject.offerEndDate;
		newOffer.newOfferEndTime = offerObject.offerEndTime;
		return newOffer;
	}

	private manageCompanyOfferList(companyOfferList: Array<CompanyOfferObject>): void {
		if (companyOfferList.length >= MAX_LIST_SIZE) {
			companyOfferList.shift();
		}
	}

}

const OfferManager = new OfferManagerInstance();
export default OfferManager;
