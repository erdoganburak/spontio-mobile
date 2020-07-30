import { Sector } from "../../enums/sector.enum"

export const CHANGE_OFFER_PHOTO = 'CHANGE_OFFER_PHOTO'
export const CHANGE_OFFER_PRODUCT_DESCRIPTION = 'CHANGE_OFFER_PRODUCT_DESCRIPTION'
export const CHANGE_OFFER_DESCRIPTION = 'CHANGE_OFFER_DESCRIPTION'
export const CHANGE_OFFER_TITLE = 'CHANGE_OFFER_TITLE'
export const CHANGE_OFFER_SECTOR = 'CHANGE_OFFER_SECTOR'

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








