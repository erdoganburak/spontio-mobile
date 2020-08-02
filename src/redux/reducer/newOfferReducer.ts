import { CHANGE_NEW_OFFER_NEW_PRICE, CHANGE_NEW_OFFER_PRICE_TYPE, CHANGE_NEW_OFFER_PHOTO, CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION, CHANGE_NEW_OFFER_DESCRIPTION, CHANGE_NEW_OFFER_TITLE, CHANGE_NEW_OFFER_SECTOR, CHANGE_NEW_OFFER_OLD_PRICE, CHANGE_NEW_OFFER_DISCOUNT, CHANGE_NEW_OFFER_QUOTA, CHANGE_NEW_OFFER_QUOTA_OLD_PRICE, CHANGE_NEW_OFFER_QUOTA_NEW_PRICE, CHANGE_NEW_OFFER_START_DATE, CHANGE_NEW_OFFER_START_TIME, CHANGE_NEW_OFFER_END_DATE, CHANGE_NEW_OFFER_END_TIME, CHANGE_NEW_OFFER_OBJECT, CHANGE_NEW_OFFER_ID } from "../actions/newOffer";
import { Sector } from "../../enums/sector.enum";
import { OfferPriceType } from "../../enums/offerPrice.enum";

export class NewOfferObject {
    id: string;
    newOfferPhoto: string;
    newOfferTitle: string;
    newOfferProductDescription: string;
    newOfferDescription: string;
    newOfferSector: Sector;
    newOfferPriceType: OfferPriceType;
    newOfferOldPrice: string;
    newOfferNewPrice: string;
    newOfferDiscount: string;
    newOfferQuota: string;
    newOfferQuotaOldPrice: string;
    newOfferQuotaNewPrice: string;
    newOfferStartDate: Date;
    newOfferStartTime: Date;
    newOfferEndDate: Date;
    newOfferEndTime: Date;
    constructor() {

    }
}

const initialState = {
    newOffer: new NewOfferObject()
}

const newOfferReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NEW_OFFER_OBJECT:
            return {
                newOffer: { ...state.newOffer, ...action.newOffer }
            };
        case CHANGE_NEW_OFFER_ID:
            return {
                newOffer: { ...state.newOffer, id: action.id }
            };
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
        case CHANGE_NEW_OFFER_PRICE_TYPE:
            return {
                newOffer: { ...state.newOffer, newOfferPriceType: action.newOfferPriceType }
            };
        case CHANGE_NEW_OFFER_OLD_PRICE:
            return {
                newOffer: { ...state.newOffer, newOfferOldPrice: action.newOfferOldPrice }
            };
        case CHANGE_NEW_OFFER_NEW_PRICE:
            return {
                newOffer: { ...state.newOffer, newOfferNewPrice: action.newOfferNewPrice }
            };
        case CHANGE_NEW_OFFER_DISCOUNT:
            return {
                newOffer: { ...state.newOffer, newOfferDiscount: action.newOfferDiscount }
            };
        case CHANGE_NEW_OFFER_QUOTA:
            return {
                newOffer: { ...state.newOffer, newOfferQuota: action.newOfferQuota }
            };
        case CHANGE_NEW_OFFER_QUOTA_OLD_PRICE:
            return {
                newOffer: { ...state.newOffer, newOfferQuotaOldPrice: action.newOfferQuotaOldPrice }
            };
        case CHANGE_NEW_OFFER_QUOTA_NEW_PRICE:
            return {
                newOffer: { ...state.newOffer, newOfferQuotaNewPrice: action.newOfferQuotaNewPrice }
            };
        case CHANGE_NEW_OFFER_START_DATE:
            return {
                newOffer: { ...state.newOffer, newOfferStartDate: action.newOfferStartDate }
            };
        case CHANGE_NEW_OFFER_START_TIME:
            return {
                newOffer: { ...state.newOffer, newOfferStartTime: action.newOfferStartTime }
            };
        case CHANGE_NEW_OFFER_END_DATE:
            return {
                newOffer: { ...state.newOffer, newOfferEndDate: action.newOfferEndDate }
            };
        case CHANGE_NEW_OFFER_END_TIME:
            return {
                newOffer: { ...state.newOffer, newOfferEndTime: action.newOfferEndTime }
            };
        default:
            return state;
    }
}

export default newOfferReducers;

