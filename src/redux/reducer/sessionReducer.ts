import { CHANGE_LOGGED_IN_STATE, CHANGE_ROLE } from "../actions/session";
import { Role } from "../../enums/role.enum";

export class Session {
    loggedIn: boolean;
    role: Role;
    constructor() {
        this.loggedIn = false;
    }
}

const initialState = {
    session: new Session()
}

const sessionReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGGED_IN_STATE:
            return {
                session: { ...state.session, loggedIn: action.loggedIn }
            };
        case CHANGE_ROLE:
            return {
                session: { ...state.session, role: action.role }
            };
        default:
            return state;
    }
}

export default sessionReducers;

