import { LoginRequest } from "../models/login/loginRequest.model";
import { LoginResponse } from "../models/login/loginResponse.model";
import BaseApi from "./base.api";

export class SessionApiInstance {

    /**
    * Login operation
    * @param loginRequest login request parameters
    */
    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        return BaseApi.requestLogin(loginRequest);
    }

}

const SessionApi = new SessionApiInstance();
export default SessionApi;