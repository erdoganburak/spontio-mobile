import { changeLoggedInState } from "../redux/actions/session";
import store from "../redux/store";
import StorageManager from "./storage.manager";
import { LocalStorageKey } from "../enums/localStorageKey.enum";
import RNRestart from "react-native-restart";
import SessionApi from "../api/session.api";
import LoginRequest from "../models/login/loginRequest.model";
import LoginResponse from "../models/login/loginResponse.model";

/**
 * Manages session information.
 */
export class SessionManagerInstance {

  private _accessToken: string;
  public get accessToken(): string {
    return this._accessToken;
  }
  public set accessToken(value: string) {
    this._accessToken = value;
  }

  private _refreshToken: string;
  public get refreshToken(): string {
    return this._refreshToken;
  }
  public set refreshToken(value: string) {
    this._refreshToken = value;
  }

  private _expirationTime: number;
  public get expirationTime(): number {
    return this._expirationTime;
  }
  public set expirationTime(value: number) {
    this._expirationTime = value;
  }

  /**
  * Initializes necessary information when program executes for the first time.
  */
  public async initializeApp() {

    this.accessToken = await StorageManager.getItem(LocalStorageKey.AccessToken, true);
    this.refreshToken = await StorageManager.getItem(LocalStorageKey.RefreshToken, true);
    this.expirationTime = Number(await StorageManager.getItem(LocalStorageKey.ExpirationTime, true));

    if (this.accessToken) {
      store.dispatch(changeLoggedInState(true));
    }

  }

  /**
  * Performs login.
  * @param email Email address of user
  * @param password Password of user
  */
  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response: LoginResponse = await SessionApi.login(this.constructLoginRequest(email, password));
      this.cacheLoginInfo(response);
      await this.saveLoginInfo(response);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private cacheLoginInfo(response: LoginResponse) {
    this.accessToken = response.result.user.stsTokenManager.accessToken;
    this.refreshToken = response.result.user.stsTokenManager.refreshToken;
    this.expirationTime = Number(response.result.user.stsTokenManager.expirationTime);
  }

  private async saveLoginInfo(response: LoginResponse) {
    await StorageManager.setItem(LocalStorageKey.AccessToken, response.result.user.stsTokenManager.accessToken, true);
    await StorageManager.setItem(LocalStorageKey.RefreshToken, response.result.user.stsTokenManager.refreshToken, true);
    await StorageManager.setItem(LocalStorageKey.ExpirationTime, response.result.user.stsTokenManager.expirationTime + "", true);
  }

  private constructLoginRequest(email: string, password: string): LoginRequest {
    let request: LoginRequest = {
      email: email,
      password: password
    }
    return request;
  }

  /**
  * Performs logout actions.
  */
  public async logout() {

    //Reset redux.
    store.dispatch(changeLoggedInState(false));

    // Clear local storage.
    await StorageManager.removeItem(LocalStorageKey.Language, true);
    await StorageManager.removeItem(LocalStorageKey.AccessToken, true);
    await StorageManager.removeItem(LocalStorageKey.RefreshToken, true);
    await StorageManager.removeItem(LocalStorageKey.ExpirationTime, true);

    // Finally restart app.
    RNRestart.Restart();
  }

}

const SessionManager = new SessionManagerInstance();
export default SessionManager;
