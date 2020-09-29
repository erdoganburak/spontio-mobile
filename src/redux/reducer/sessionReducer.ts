import { CHANGE_LOGGED_IN_STATE, CHANGE_ROLE, FETCH_LOGIN_FAILURE, FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_REGISTER_USER_FAILURE, FETCH_REGISTER_USER_REQUEST, FETCH_REGISTER_USER_SUCCESS, LoginRequestState } from "../actions/session";
import { Role } from "../../enums/role.enum";
import { RegisterUserRequestState } from "../models/registerUserRequestState.model";

export class Session {
    loggedIn: boolean;
    role: Role;
    loginRequestState: LoginRequestState;
    registerUserState: RegisterUserRequestState;
    constructor() {
        this.loggedIn = false;
        this.role = null;
        this.loginRequestState = {
            type: null,
            loading: false,
            loginResponse: null,
            error: ''
        };
        this.registerUserState = {
            type: null,
            loading: false,
            error: ''
        };
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
        case FETCH_LOGIN_REQUEST:
            return {
                session: { ...state.session, loginRequestState: action }
            }
        case FETCH_LOGIN_SUCCESS:
            return {
                session: { ...state.session, loginRequestState: action }
            }
        case FETCH_LOGIN_FAILURE:
            return {
                session: { ...state.session, loginRequestState: action }
            }
        case FETCH_REGISTER_USER_REQUEST:
            return {
                session: { ...state.session, registerUserState: action }
            }
        case FETCH_REGISTER_USER_SUCCESS:
            return {
                session: { ...state.session, registerUserState: action }
            }
        case FETCH_REGISTER_USER_FAILURE:
            return {
                session: { ...state.session, registerUserState: action }
            }
        default:
            return state;
    }
}

export default sessionReducers;

