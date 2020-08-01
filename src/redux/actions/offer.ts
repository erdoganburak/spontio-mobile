import { Sector } from "../../enums/sector.enum"
import { OfferPriceType } from "../../enums/offerPrice.enum"

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


export const changeOfferPhoto = (offerPhoto: string) => {
    return { type: CHANGE_OFFER_PHOTO, offerPhoto };
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

export const changeOfferPriceType = (offerPriceType: OfferPriceType) => {
    return { type: CHANGE_OFFER_PRICE_TYPE, offerPriceType };
}

export const changeOfferOldPrice = (offerOldPrice: string) => {
    return { type: CHANGE_OFFER_OLD_PRICE, offerOldPrice };
}

export const changeOfferNewPrice = (offerNewPrice: string) => {
    return { type: CHANGE_OFFER_NEW_PRICE, offerNewPrice };
}

export const changeOfferDiscount = (offerDiscount: string) => {
    return { type: CHANGE_OFFER_NEW_PRICE, offerDiscount };
}

export const changeOfferQuota = (offerQuota: string) => {
    return { type: CHANGE_OFFER_QUOTA, offerQuota };
}

export const changeOfferQuotaOldPrice = (offerQuotaOldPrice: string) => {
    return { type: CHANGE_OFFER_QUOTA_OLD_PRICE, offerQuotaOldPrice };
}

export const changeOfferQuotaNewPrice = (offerQuotaNewPrice: string) => {
    return { type: CHANGE_OFFER_QUOTA_NEW_PRICE, offerQuotaNewPrice };
}







