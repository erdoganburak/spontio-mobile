import { CHANGE_OFFER_PHOTO, CHANGE_OFFER_PRODUCT_DESCRIPTION, CHANGE_OFFER_DESCRIPTION, CHANGE_OFFER_TITLE, CHANGE_OFFER_SECTOR, CHANGE_OFFER_PRICE_TYPE, CHANGE_OFFER_OLD_PRICE, CHANGE_OFFER_NEW_PRICE, CHANGE_OFFER_DISCOUNT, CHANGE_OFFER_QUOTA, CHANGE_OFFER_QUOTA_OLD_PRICE, CHANGE_OFFER_QUOTA_NEW_PRICE, CHANGE_OFFER_START_DATE, CHANGE_OFFER_START_TIME, CHANGE_OFFER_END_DATE, CHANGE_OFFER_END_TIME, CHANGE_OFFER_ID } from "../actions/offer";
import { Sector } from "../../enums/sector.enum";
import { OfferPriceType } from "../../enums/offerPrice.enum";

export class CompanyOfferObject {
    id: string;
    offerPhoto: string;
    title: string;
    productDescription: string;
    offerDescription: string;
    offerSector: Sector;
    offerPriceType: OfferPriceType;
    offerOldPrice: string;
    offerNewPrice: string;
    offerDiscount: string;
    offerQuota: string;
    offerQuotaOldPrice: string;
    offerQuotaNewPrice: string;
    offerStartDate: Date;
    offerStartTime: Date;
    offerEndDate: Date;
    offerEndTime: Date;
    constructor() {

    }
}

const initialState = {
    offer: new CompanyOfferObject()
}

const companyOfferReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_OFFER_ID:
            return {
                offer: { ...state.offer, id: action.id }
            };
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
        case CHANGE_OFFER_SECTOR:
            return {
                offer: { ...state.offer, offerSector: action.offerSector }
            };
        case CHANGE_OFFER_PRICE_TYPE:
            return {
                newOffer: { ...state.offer, offerPriceType: action.offerPriceType }
            };
        case CHANGE_OFFER_OLD_PRICE:
            return {
                newOffer: { ...state.offer, offerOldPrice: action.offerOldPrice }
            };
        case CHANGE_OFFER_NEW_PRICE:
            return {
                newOffer: { ...state.offer, offerNewPrice: action.offerNewPrice }
            };
        case CHANGE_OFFER_DISCOUNT:
            return {
                newOffer: { ...state.offer, offerDiscount: action.offerDiscount }
            };
        case CHANGE_OFFER_QUOTA:
            return {
                newOffer: { ...state.offer, offerQuota: action.offerQuota }
            };
        case CHANGE_OFFER_QUOTA_OLD_PRICE:
            return {
                newOffer: { ...state.offer, offerQuotaOldPrice: action.offerQuotaOldPrice }
            };
        case CHANGE_OFFER_QUOTA_NEW_PRICE:
            return {
                newOffer: { ...state.offer, offerQuotaNewPrice: action.offerQuotaNewPrice }
            };
        case CHANGE_OFFER_START_DATE:
            return {
                newOffer: { ...state.offer, offerStartDate: action.offerStartDate }
            };
        case CHANGE_OFFER_START_TIME:
            return {
                newOffer: { ...state.offer, offerStartTime: action.offerStartTime }
            };
        case CHANGE_OFFER_END_DATE:
            return {
                newOffer: { ...state.offer, offerEndDate: action.offerEndDate }
            };
        case CHANGE_OFFER_END_TIME:
            return {
                newOffer: { ...state.offer, offerEndTime: action.offerEndTime }
            };
        default:
            return state;
    }
}

export default companyOfferReducers;

