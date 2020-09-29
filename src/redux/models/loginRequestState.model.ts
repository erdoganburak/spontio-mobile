import LoginResponse from "../../models/login/loginResponse.model";
import { HttpRequestBase } from "./httpRequestBase.model";

export interface LoginRequestState extends HttpRequestBase {
    loginResponse: LoginResponse
}
