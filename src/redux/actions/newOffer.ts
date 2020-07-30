import { Sector } from "../../enums/sector.enum"

export const CHANGE_NEW_OFFER_PHOTO = 'CHANGE_NEW_OFFER_PHOTO'
export const CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION = 'CHANGE_NEW_OFFER_PRODUCT_DESCRIPTION'
export const CHANGE_NEW_OFFER_DESCRIPTION = 'CHANGE_NEW_OFFER_DESCRIPTION'
export const CHANGE_NEW_OFFER_TITLE = 'CHANGE_NEW_OFFER_TITLE'
export const CHANGE_NEW_OFFER_SECTOR = 'CHANGE_NEW_OFFER_SECTOR'

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







