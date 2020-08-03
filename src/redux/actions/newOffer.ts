import { Sector } from "../../enums/sector.enum"
import { OfferPriceType } from "../../enums/offerPrice.enum"
import { OfferObject } from "../../models/offerObject.model"

export const CHANGE_NEW_OFFER_OBJECT = 'CHANGE_NEW_OFFER_OBJECT'
export const CHANGE_OFFER_ID = 'CHANGE_OFFER_ID'
export const CHANGE_OFFER_PHOTO = 'CHANGE_OFFER_PHOTO'
export const CHANGE_OFFER_PRODUCT_DESCRIPTION = 'CHANGE_OFFER_PRODUCT_DESCRIPTION'
export const CHANGE_OFFER_DESCRIPTION = 'CHANGE_OFFER_DESCRIPTION'
export const CHANGE_OFFER_TITLE = 'CHANGE_OFFER_TITLE'
export const CHANGE_OFFER_SECTOR = 'CHANGE_OFFER_SECTOR'
export const CHANGE_OFFER_PRICE_TYPE = 'CHANGE_OFFER_PRICE_TYPE'
export const CHANGE_OFFER_OLD_PRICE = 'CHANGE_OFFER_OLD_PRICE'
export const CHANGE_OFFER_NEW_PRICE = 'CHANGE_OFFER_NEW_PRICE'
export const CHANGE_OFFER_DISCOUNT = 'CHANGE_OFFER_DISCOUNT'
export const CHANGE_OFFER_QUOTA = 'CHANGE_OFFER_QUOTA'
export const CHANGE_OFFER_QUOTA_OLD_PRICE = 'CHANGE_OFFER_QUOTA_OLD_PRICE'
export const CHANGE_OFFER_QUOTA_NEW_PRICE = 'CHANGE_OFFER_QUOTA_NEW_PRICE'
export const CHANGE_OFFER_START_DATE = 'CHANGE_OFFER_START_DATE'
export const CHANGE_OFFER_START_TIME = 'CHANGE_OFFER_START_TIME'
export const CHANGE_OFFER_END_DATE = 'CHANGE_OFFER_END_DATE'
export const CHANGE_OFFER_END_TIME = 'CHANGE_OFFER_END_TIME'

export const changeNewOfferObject = (newOffer: OfferObject) => {
    return { type: CHANGE_NEW_OFFER_OBJECT, newOffer };
}

export const changeOfferId = (id: string) => {
    return { type: CHANGE_OFFER_ID, id };
}

export const changeOfferPhoto = (photo: string) => {
    return { type: CHANGE_OFFER_PHOTO, photo };
}

export const changeProductDescription = (productDescription: string) => {
    return { type: CHANGE_OFFER_PRODUCT_DESCRIPTION, productDescription };
}

export const changeOfferDescription = (offerDescription: string) => {
    return { type: CHANGE_OFFER_DESCRIPTION, offerDescription };
}

export const changeTitle = (title: string) => {
    return { type: CHANGE_OFFER_TITLE, title };
}

export const changeOfferSector = (sector: Sector) => {
    return { type: CHANGE_OFFER_SECTOR, sector };
}

export const changeOfferPriceType = (priceType: OfferPriceType) => {
    return { type: CHANGE_OFFER_PRICE_TYPE, priceType };
}

export const changeOfferOldPrice = (oldPrice: string) => {
    return { type: CHANGE_OFFER_OLD_PRICE, oldPrice };
}

export const changeOfferNewPrice = (newPrice: string) => {
    return { type: CHANGE_OFFER_NEW_PRICE, newPrice };
}

export const changeOfferDiscount = (discount: string) => {
    return { type: CHANGE_OFFER_NEW_PRICE, discount };
}

export const changeOfferQuota = (quota: string) => {
    return { type: CHANGE_OFFER_QUOTA, quota };
}

export const changeOfferQuotaOldPrice = (quotaOldPrice: string) => {
    return { type: CHANGE_OFFER_QUOTA_OLD_PRICE, quotaOldPrice };
}

export const changeOfferQuotaNewPrice = (quotaNewPrice: string) => {
    return { type: CHANGE_OFFER_QUOTA_NEW_PRICE, quotaNewPrice };
}

export const changeOfferStartDate = (startDate: Date) => {
    return { type: CHANGE_OFFER_START_DATE, startDate };
}

export const changeOfferStartTime = (startTime: Date) => {
    return { type: CHANGE_OFFER_START_TIME, startTime };
}

export const changeOfferEndDate = (endDate: Date) => {
    return { type: CHANGE_OFFER_END_DATE, endDate };
}

export const changeOfferEndTime = (endTime: Date) => {
    return { type: CHANGE_OFFER_END_TIME, endTime };
}