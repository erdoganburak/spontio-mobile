import { CHANGE_LOGGED_IN_STATE } from "../actions/session";

export class Session {
    loggedIn: boolean;
    constructor() {
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
        default:
            return state;
    }
}

export default sessionReducers;

