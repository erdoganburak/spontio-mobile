import { CHANGE_PROFILE_PICTURE, CHANGE_EMAIL, CHANGE_PASSWORD, UPDATE_COMPANY, UPDATE_STANDART_USER } from "../actions/user";
import { OfferObject } from "../../models/offerObject.model";

export class User {
    id: string;
    email: string;
    password: string;
    picture_id: string;
    standartUser: StandartUser;
    company: Company;
    constructor() {
        this.company = new Company();
        this.standartUser = new StandartUser();
    }
}

export class StandartUser {
    name: string;
    surname: string;
    sex: string;
    birthday: string;
    phoneNumber: string;
}

export class Company {
    constructor() {
        this.companyOfferList = new Array<OfferObject>();
    }

    company_name: string;
    address: string;
    tel: string;
    webAddress: string;
    document_id: string;
    verified: string;
    companyProfilePicture: string;
    companyOfferList: Array<OfferObject>;
}

const initialState = {
    user: new User()
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PROFILE_PICTURE:
            return {
                user: { ...state.user, picture_id: action.picture_id }
            };
        case CHANGE_EMAIL:
            return {
                user: { ...state.user, email: action.email }
            };
        case CHANGE_PASSWORD:
            return {
                user: { ...state.user, password: action.password }
            };
        case UPDATE_COMPANY:
            return {
                user: { ...state.user, company: action.company }
            };
        case UPDATE_STANDART_USER:
            return {
                user: { ...state.user, standartUser: action.standartUser }
            };
        default:
            return state;
    }
}

export default userReducers;

