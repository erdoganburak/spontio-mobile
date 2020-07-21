import { CHANGE_USER_PROFILE_PICTURE, CHANGE_COMPANY_PROFILE_PICTURE, CHANGE_USERNAME, CHANGE_PASSWORD } from "../actions/user";

export class User {
    userProfilePicture: string;
    companyProfilePicture: string;
    username: string;
    password: string;
    constructor() {
    }
}

const initialState = {
    user: new User()
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_PROFILE_PICTURE:
            return {
                user: { ...state.user, userProfilePicture: action.userProfilePicture }
            };
        case CHANGE_COMPANY_PROFILE_PICTURE:
            return {
                user: { ...state.user, companyProfilePicture: action.companyProfilePicture }
            };
        case CHANGE_USERNAME:
            return {
                user: { ...state.user, username: action.username }
            };
        case CHANGE_PASSWORD:
            return {
                user: { ...state.user, password: action.password }
            };
        default:
            return state;
    }
}

export default userReducers;

