import { CompanyOfferObject } from "../redux/reducer/companyOfferReducer";
import store from "../redux/store";
import { updateCompanyOfferList } from "../redux/actions/user";
import { changeNewOfferPhoto, changeNewOfferDescription, changeNewOfferProductDescription, changeNewOfferTitle } from "../redux/actions/newOffer";

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
	}

	private manageCompanyOfferList(companyOfferList: Array<CompanyOfferObject>): void {
		if (companyOfferList.length >= MAX_LIST_SIZE) {
			companyOfferList.shift();
		}
	}

}
const OfferManager = new OfferManagerInstance();
export default OfferManager;
