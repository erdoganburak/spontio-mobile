import { Dispatch } from "react";
import BaseApi from "../../api/base.api";
import LoginRequest from "../../models/login/loginRequest.model";
import LoginResponse from "../../models/login/loginResponse.model";
import { Role } from "../../enums/role.enum";
import { translate } from "../../managers/language.manager";
import NavigationManager from "../../managers/navigation.manager";
import ToastManager from "../../managers/toast.manager";
import { LoginRequestState } from "../models/loginRequestState.model";
import { RegisterUserRequestState } from "../models/registerUserRequestState.model";
import SessionManager from "../../managers/session.manager";

export const CHANGE_LOGGED_IN_STATE = 'CHANGE_LOGGED_IN_STATE';
export const CHANGE_ROLE = 'CHANGE_ROLE';
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';
export const FETCH_REGISTER_USER_REQUEST = 'FETCH_REGISTER_USER_REQUEST';
export const FETCH_REGISTER_USER_SUCCESS = 'FETCH_REGISTER_USER_SUCCESS';
export const FETCH_REGISTER_USER_FAILURE = 'FETCH_REGISTER_USER_FAILURE';

export const changeLoggedInState = (loggedIn: boolean) => {
    return { type: CHANGE_LOGGED_IN_STATE, loggedIn };
}

export const changeRole = (role: Role) => {
    return { type: CHANGE_ROLE, role };
}

const requestRegisterUser = (): RegisterUserRequestState => ({
    type: FETCH_REGISTER_USER_REQUEST,
    loading: true,
    error: ''
})

const receiveRegisterUser = (): RegisterUserRequestState => ({
    type: FETCH_REGISTER_USER_SUCCESS,
    loading: false,
    error: ''
})

const invalidateRegisterUser = (error: string | undefined): RegisterUserRequestState => ({
    type: FETCH_REGISTER_USER_FAILURE,
    loading: false,
    error: 'Unable to register: ' + error
})

const requestLogin = (): LoginRequestState => ({
    type: FETCH_LOGIN_REQUEST,
    loading: true,
    loginResponse: null,
    error: ''
})

const receiveLogin = (loginResponse: LoginResponse): LoginRequestState => ({
    type: FETCH_LOGIN_SUCCESS,
    loading: false,
    loginResponse: loginResponse,
    error: ''
})

const invalidateLogin = (error: string | undefined): LoginRequestState => ({
    type: FETCH_LOGIN_REQUEST,
    loading: false,
    loginResponse: null,
    error: 'Unable to login: ' + error
})

export const boundRegisterUser = () => {
    return async (dispatch: Dispatch<any>, getState) => {
        dispatch(requestRegisterUser())
        try {
            await BaseApi.registerUser(getState().userReducer.user.email,
                getState().userReducer.user.password);
            NavigationManager.reset(translate("navigation.new_user_success"));
            dispatch(receiveRegisterUser());
        } catch (error) {
            dispatch(invalidateRegisterUser(error));
            ToastManager.showDanger("Error occured while registering");
        }
    }
}

export const boundRequestLogin = () => {
    return async (dispatch: Dispatch<any>, getState) => {
        dispatch(requestLogin())
        try {
            let request: LoginRequest = {
                email: getState().userReducer.user.email,
                password: getState().userReducer.user.password
            }
            let result = await BaseApi.requestLogin(request);
            dispatch(receiveLogin(result));
            dispatch(changeLoggedInState(true));
            dispatch(changeRole(Role.Company));
            BaseApi.accessToken = result.result.user.stsTokenManager.accessToken;
            SessionManager.startRefreshTokenTimer();
            NavigationManager.setHeaderOptions(true, true, false, true);
            NavigationManager.reset(translate("navigation.home"));
        } catch (error) {
            dispatch(invalidateLogin(error))
            ToastManager.showDanger(translate('error.login_error'));
        }
    }
}





