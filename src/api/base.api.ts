import RNFetchBlob, { FetchBlobResponse } from 'rn-fetch-blob'
import LoginRequest from '../models/login/loginRequest.model';
import LoginResponse from '../models/login/loginResponse.model';
import { HttpStatusCode } from '../enums/httpStatusCode.enum';

export const HTTP_REQUEST_TIMEOUT = 1000 * 30;
export const BASE_PATH = 'https://us-central1-spontio-dev-2ed76.cloudfunctions.net';
export const AUTH_PATH = 'auth'
export const APP_PATH = 'app'

export class BaseApiInstance {

    /**
    * HTTP request get operation
    * @param url url of endpoint
    * @param accessToken access token
    */
    public async requestGet(url: string, accessToken: string): Promise<any> {
        try {
            let result: FetchBlobResponse = await RNFetchBlob.config({
                timeout: HTTP_REQUEST_TIMEOUT
            }).fetch("GET", BASE_PATH + '/' + APP_PATH + '/' + url, {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            })
            if (result) {
                const status = result.info().status;
                if (status == HttpStatusCode.Success) {
                    return Promise.resolve(result.json());
                } else {
                    console.log('HTTP REQUEST GET STATUS CODE => ' + status);
                    return Promise.reject(status);
                }
            }
        } catch (error) {
            console.error('HTTP REQUEST GET ERROR => ' + error);
            return Promise.reject(error);
        }
    }

    /**
    * HTTP request post operation
    * @param url url of endpoint
    * @param accessToken access token
    */
    public async requestPost(url: string, params: any, accessToken: string): Promise<any> {
        try {
            let result: FetchBlobResponse = await RNFetchBlob.config({
                timeout: HTTP_REQUEST_TIMEOUT
            }).fetch("POST", BASE_PATH + '/' + APP_PATH + '/' + url, {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }, JSON.stringify(params))
            if (result) {
                const status = result.info().status;
                if (status == HttpStatusCode.Success) {
                    return Promise.resolve(result.json());
                } else {
                    console.log('HTTP REQUEST POST STATUS CODE => ' + status);
                    return Promise.reject(status);
                }
            }
        } catch (error) {
            console.error('HTTP REQUEST POST ERROR => ' + error);
            return Promise.reject(error);
        }
    }

    /**
    * login request
    * @param loginRequest login request parameters
    */
    public async requestLogin(loginRequest: LoginRequest): Promise<LoginResponse> {
        try {
            let result: FetchBlobResponse = await RNFetchBlob.config({
                timeout: HTTP_REQUEST_TIMEOUT
            }).fetch("POST", BASE_PATH + '/' + AUTH_PATH + '/login', {
                'Content-Type': 'application/json'
            }, JSON.stringify(loginRequest))
            if (result) {
                const status = result.info().status;
                console.log(status)
                if (status == HttpStatusCode.Success) {
                    return Promise.resolve(result.json());
                } else {
                    console.log(BASE_PATH + '/' + AUTH_PATH + '/login');
                    console.log('HTTP REQUEST LOGIN STATUS CODE => ' + status);
                    return Promise.reject(status);
                }
            }
        } catch (error) {
            console.error('HTTP REQUEST LOGIN ERROR => ' + error);
            return Promise.reject(error);
        }
    }

    /**
    * Registers user
    * @param email email address of user
    * @param password password of user
    */
    public async registerUser(email: string, password: string): Promise<any> {
        try {
            let result: FetchBlobResponse = await RNFetchBlob.config({
                timeout: HTTP_REQUEST_TIMEOUT
            }).fetch("POST", BASE_PATH + '/' + AUTH_PATH + '/register', {
                'Content-Type': 'application/json'
            }, JSON.stringify({
                email: email,
                password: password
            }))
            if (result) {
                const status = result.info().status;
                console.log(status)
                if (status == HttpStatusCode.Success) {
                    return Promise.resolve(result.json());
                } else {
                    console.log(BASE_PATH + '/' + AUTH_PATH + '/register');
                    console.log('HTTP REQUEST REGISTER USER STATUS CODE => ' + status);
                    return Promise.reject(status);
                }
            }
        } catch (error) {
            console.error('HTTP REQUEST REGISTER USER ERROR => ' + error);
            return Promise.reject(error);
        }
    }


}

const BaseApi = new BaseApiInstance();
export default BaseApi;