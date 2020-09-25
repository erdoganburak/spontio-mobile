
import BaseApi from "./base.api";
import LoginRequest from "../models/login/loginRequest.model";
import LoginResponse from "../models/login/loginResponse.model";

export class SessionApiInstance {

    /**
    * Login operation
    * @param loginRequest login request parameters
    */
    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        return BaseApi.requestLogin(loginRequest);
    }

    /**
    * Register user
    * @param email email address of user
    * @param password password of user
    */
    public async registerUser(email: string, password: string): Promise<any> {
        return BaseApi.registerUser(email, password);
    }

    /**
    * Refresh token operation
    * @param refreshToken current refresh token
    */
    public async refreshToken(refreshToken: string) {

    }

}

const SessionApi = new SessionApiInstance();
export default SessionApi;