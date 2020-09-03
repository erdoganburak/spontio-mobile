import { Sector } from "../enums/sector.enum";
import { OfferPriceType } from "../enums/offerPrice.enum";

export class OfferObject {
    id: string;
    photo: string;
    title: string;
    productDescription: string;
    offerDescription: string;
    sector: Sector;
    priceType: OfferPriceType;
    oldPrice: string;
    newPrice: string;
    discount: string;
    quota: string;
    quotaOldPrice: string;
    quotaNewPrice: string;
    startDate: Date;
    startTime: Date;
    endDate: Date;
    endTime: Date;
    
    constructor() {

    }
}