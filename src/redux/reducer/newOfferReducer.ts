import { CHANGE_NEW_OFFER_PHOTO } from "../actions/newOffer";

export class NewOfferObject {
    newOfferPhoto: string;
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
        default:
            return state;
    }
}

export default newOfferReducers;

