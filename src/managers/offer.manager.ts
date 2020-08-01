import { CompanyOfferObject } from "../redux/reducer/companyOfferReducer";
import store from "../redux/store";
import { updateCompanyOfferList } from "../redux/actions/user";
import { changeNewOfferPhoto, changeNewOfferDescription, changeNewOfferProductDescription, changeNewOfferTitle, changeNewOfferSector, changeNewOfferPriceType, changeNewOfferOldPrice, changeNewOfferNewPrice, changeNewOfferDiscount, changeNewOfferQuota, changeNewOfferQuotaOldPrice, changeNewOfferQuotaNewPrice } from "../redux/actions/newOffer";
import { Sector } from "../enums/sector.enum";
import { OfferPriceType } from "../enums/offerPrice.enum";

const MAX_LIST_SIZE = 5;

class OfferManagerInstance {

	/**
  	* Adds new company offer to company list.
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
  	* Resets new offer object
  	* 
  	*/
	public resetNewOffer(): void {
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
	}

	private manageCompanyOfferList(companyOfferList: Array<CompanyOfferObject>): void {
		if (companyOfferList.length >= MAX_LIST_SIZE) {
			companyOfferList.shift();
		}
	}

}

const OfferManager = new OfferManagerInstance();
export default OfferManager;
