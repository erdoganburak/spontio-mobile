import { CHANGE_USER_PROFILE_PICTURE } from "../actions/user";

export class User {
    profilePicture: string;
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
                user: { ...state.user, profilePicture: action.profilePicture }
            };
        default:
            return state;
    }
}

export default userReducers;

