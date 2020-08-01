import { Sector } from "../../enums/sector.enum"
import { OfferPriceType } from "../../enums/offerPrice.enum"

export const CHANGE_NEW_OFFER_PHOTO = 'CHANGE_NEW_OFFER_PHOTO'
export const CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION = 'CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION'
export const CHANGE_NEW_OFFER_DESCRIPTION = 'CHANGE_NEW_OFFER_DESCRIPTION'
export const CHANGE_NEW_OFFER_TITLE = 'CHANGE_NEW_OFFER_TITLE'
export const CHANGE_NEW_OFFER_SECTOR = 'CHANGE_NEW_OFFER_SECTOR'
export const CHANGE_NEW_OFFER_PRICE_TYPE = 'CHANGE_NEW_OFFER_PRICE_TYPE'
export const CHANGE_NEW_OFFER_OLD_PRICE = 'CHANGE_NEW_OFFER_OLD_PRICE'
export const CHANGE_NEW_OFFER_NEW_PRICE = 'CHANGE_NEW_OFFER_NEW_PRICE'
export const CHANGE_NEW_OFFER_DISCOUNT = 'CHANGE_NEW_OFFER_DISCOUNT'
export const CHANGE_NEW_OFFER_QUOTA = 'CHANGE_NEW_OFFER_QUOTA'
export const CHANGE_NEW_OFFER_QUOTA_OLD_PRICE = 'CHANGE_NEW_OFFER_QUOTA_OLD_PRICE'
export const CHANGE_NEW_OFFER_QUOTA_NEW_PRICE = 'CHANGE_NEW_OFFER_QUOTA_NEW_PRICE'


export const changeNewOfferPhoto = (newOfferPhoto: string) => {
    return { type: CHANGE_NEW_OFFER_PHOTO, newOfferPhoto };
}

export const changeNewOfferProductDescription = (newOfferProductDescription: string) => {
    return { type: CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION, newOfferProductDescription };
}

export const changeNewOfferDescription = (newOfferDescription: string) => {
    return { type: CHANGE_NEW_OFFER_DESCRIPTION, newOfferDescription };
}

export const changeNewOfferTitle = (newOfferTitle: string) => {
    return { type: CHANGE_NEW_OFFER_TITLE, newOfferTitle };
}

export const changeNewOfferSector = (newOfferSector: Sector) => {
    return { type: CHANGE_NEW_OFFER_SECTOR, newOfferSector };
}

export const changeNewOfferPriceType = (newOfferPriceType: OfferPriceType) => {
    return { type: CHANGE_NEW_OFFER_PRICE_TYPE, newOfferPriceType };
}

export const changeNewOfferOldPrice = (newOfferOldPrice: string) => {
    return { type: CHANGE_NEW_OFFER_OLD_PRICE, newOfferOldPrice };
}

export const changeNewOfferNewPrice = (newOfferNewPrice: string) => {
    return { type: CHANGE_NEW_OFFER_NEW_PRICE, newOfferNewPrice };
}

export const changeNewOfferDiscount = (newOfferDiscount: string) => {
    return { type: CHANGE_NEW_OFFER_NEW_PRICE, newOfferDiscount };
}

export const changeNewOfferQuota = (newOfferQuota: string) => {
    return { type: CHANGE_NEW_OFFER_QUOTA, newOfferQuota };
}

export const changeNewOfferQuotaOldPrice = (newOfferQuotaOldPrice: string) => {
    return { type: CHANGE_NEW_OFFER_QUOTA_OLD_PRICE, newOfferQuotaOldPrice };
}

export const changeNewOfferQuotaNewPrice = (newOfferQuotaNewPrice: string) => {
    return { type: CHANGE_NEW_OFFER_QUOTA_NEW_PRICE, newOfferQuotaNewPrice };
}










