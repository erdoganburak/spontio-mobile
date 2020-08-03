import { OfferObject } from "../../models/offerObject.model";
import { CHANGE_OFFER_ID, CHANGE_OFFER_PHOTO, CHANGE_NEW_OFFER_OBJECT, CHANGE_OFFER_PRODUCT_DESCRIPTION, CHANGE_OFFER_DESCRIPTION, CHANGE_OFFER_TITLE, CHANGE_OFFER_SECTOR, CHANGE_OFFER_PRICE_TYPE, CHANGE_OFFER_OLD_PRICE, CHANGE_OFFER_NEW_PRICE, CHANGE_OFFER_DISCOUNT, CHANGE_OFFER_QUOTA, CHANGE_OFFER_QUOTA_OLD_PRICE, CHANGE_OFFER_QUOTA_NEW_PRICE, CHANGE_OFFER_START_DATE, CHANGE_OFFER_START_TIME, CHANGE_OFFER_END_DATE, CHANGE_OFFER_END_TIME } from "../actions/newOffer";


const initialState = {
    newOffer: new OfferObject()
}

const newOfferReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NEW_OFFER_OBJECT:
            return {
                newOffer: { ...state.newOffer, ...action.newOffer }
            };
        case CHANGE_OFFER_ID:
            return {
                newOffer: { ...state.newOffer, id: action.id }
            };
        case CHANGE_OFFER_PHOTO:
            return {
                newOffer: { ...state.newOffer, photo: action.photo }
            };
        case CHANGE_OFFER_PRODUCT_DESCRIPTION:
            return {
                newOffer: { ...state.newOffer, productDescription: action.productDescription }
            };
        case CHANGE_OFFER_DESCRIPTION:
            return {
                newOffer: { ...state.newOffer, offerDescription: action.offerDescription }
            };
        case CHANGE_OFFER_TITLE:
            return {
                newOffer: { ...state.newOffer, title: action.title }
            };
        case CHANGE_OFFER_SECTOR:
            return {
                newOffer: { ...state.newOffer, sector: action.sector }
            };
        case CHANGE_OFFER_PRICE_TYPE:
            return {
                newOffer: { ...state.newOffer, priceType: action.priceType }
            };
        case CHANGE_OFFER_OLD_PRICE:
            return {
                newOffer: { ...state.newOffer, oldPrice: action.oldPrice }
            };
        case CHANGE_OFFER_NEW_PRICE:
            return {
                newOffer: { ...state.newOffer, newPrice: action.newPrice }
            };
        case CHANGE_OFFER_DISCOUNT:
            return {
                newOffer: { ...state.newOffer, discount: action.discount }
            };
        case CHANGE_OFFER_QUOTA:
            return {
                newOffer: { ...state.newOffer, quota: action.quota }
            };
        case CHANGE_OFFER_QUOTA_OLD_PRICE:
            return {
                newOffer: { ...state.newOffer, quotaOldPrice: action.quotaOldPrice }
            };
        case CHANGE_OFFER_QUOTA_NEW_PRICE:
            return {
                newOffer: { ...state.newOffer, quotaNewPrice: action.quotaNewPrice }
            };
        case CHANGE_OFFER_START_DATE:
            return {
                newOffer: { ...state.newOffer, startDate: action.startDate }
            };
        case CHANGE_OFFER_START_TIME:
            return {
                newOffer: { ...state.newOffer, startTime: action.startTime }
            };
        case CHANGE_OFFER_END_DATE:
            return {
                newOffer: { ...state.newOffer, endDate: action.endDate }
            };
        case CHANGE_OFFER_END_TIME:
            return {
                newOffer: { ...state.newOffer, endTime: action.endTime }
            };
        default:
            return state;
    }
}

export default newOfferReducers;

