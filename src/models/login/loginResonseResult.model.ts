import LoginResponseUser from "./loginResonseUser.model";
import LoginResponseAdditionalUserInfo from "./loginResonseAdditionalUserInfo.model";

export default interface  LoginResponseResult {
    user: LoginResponseUser;
    credential: any;
    additionalUserInfo: LoginResponseAdditionalUserInfo;
    operationType: string;
}