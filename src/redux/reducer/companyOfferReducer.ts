import { CHANGE_OFFER_PHOTO, CHANGE_OFFER_PRODUCT_DESCRIPTION, CHANGE_OFFER_DESCRIPTION, CHANGE_OFFER_TITLE } from "../actions/offer";

export class CompanyOfferObject {
    offerPhoto: string;
    title: string;
    productDescription: string;
    offerDescription: string;
    constructor() {
    }
}

const initialState = {
    offer: new CompanyOfferObject()
}

const companyOfferReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_OFFER_PHOTO:
            return {
                offer: { ...state.offer, offerPhoto: action.offerPhoto }
            };
        case CHANGE_OFFER_PRODUCT_DESCRIPTION:
            return {
                offer: { ...state.offer, productDescription: action.productDescription }
            };
        case CHANGE_OFFER_DESCRIPTION:
            return {
                offer: { ...state.offer, offerDescription: action.offerDescription }
            };
        case CHANGE_OFFER_TITLE:
            return {
                offer: { ...state.offer, title: action.title }
            };
        default:
            return state;
    }
}

export default companyOfferReducers;

