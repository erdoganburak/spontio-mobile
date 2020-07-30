import { CHANGE_NEW_OFFER_PHOTO, CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION, CHANGE_NEW_OFFER_DESCRIPTION, CHANGE_NEW_OFFER_TITLE, CHANGE_NEW_OFFER_SECTOR } from "../actions/newOffer";
import { Sector } from "../../enums/sector.enum";

export class NewOfferObject {
    newOfferPhoto: string;
    newOfferTitle: string;
    newOfferProductDescription: string;
    newOfferDescription: string;
    newOfferSector: Sector;
    constructor() {
    }
}

const initialState = {
    newOffer: new NewOfferObject()
}

const newOfferReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NEW_OFFER_PHOTO:
            return {
                newOffer: { ...state.newOffer, newOfferPhoto: action.newOfferPhoto }
            };
        case CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION:
            return {
                newOffer: { ...state.newOffer, newOfferProductDescription: action.newOfferProductDescription }
            };
        case CHANGE_NEW_OFFER_DESCRIPTION:
            return {
                newOffer: { ...state.newOffer, newOfferDescription: action.newOfferDescription }
            };
        case CHANGE_NEW_OFFER_TITLE:
            return {
                newOffer: { ...state.newOffer, newOfferTitle: action.newOfferTitle }
            };
        case CHANGE_NEW_OFFER_SECTOR:
            return {
                newOffer: { ...state.newOffer, newOfferSector: action.newOfferSector }
            };
        default:
            return state;
    }
}

export default newOfferReducers;

