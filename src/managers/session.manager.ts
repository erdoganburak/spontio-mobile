import { changeLoggedInState } from "../redux/actions/session";
import store from "../redux/store";
import StorageManager from "./storage.manager";
import { LocalStorageKey } from "../enums/localStorageKey.enum";
import RNRestart from "react-native-restart";
import SessionApi from "../api/session.api";
import LoginRequest from "../models/login/loginRequest.model";
import LoginResponse from "../models/login/loginResponse.model";
import moment from 'moment';
import { AppState } from "react-native";

const RETRY_FOR_VALID_TOKEN_TIMEOUT = 60000;

/**
 * Manages session information.
 */
export class SessionManagerInstance {

  private _accessToken: string;
  private _refreshToken: string;
  private _expirationTime: string;

  private refreshTimer: number;
  private _isTokenValidForRequests: boolean;

  public get accessToken(): string {
    return this._accessToken;
  }
  public set accessToken(value: string) {
    this._accessToken = value;
  }
  public get currentRefreshToken(): string {
    return this._refreshToken;
  }
  public set currentRefreshToken(value: string) {
    this._refreshToken = value;
  }
  public get expirationTime(): Date {
    return this._expirationTime ? new Date(this._expirationTime) : null;
  }
  public set expirationTime(value: Date) {
    this._expirationTime = value.toString();
  }
  public get isTokenValidForRequests(): boolean {
    return this._isTokenValidForRequests;
  }
  public set isTokenValidForRequests(value: boolean) {
    this._isTokenValidForRequests = value;
  }

  constructor() {
    this.refreshTimer = null;
    this.isTokenValidForRequests = false;

    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  /**
  * Initializes necessary information and actions when program executes for the first time.
  */
  public async initializeApp() {

    this.accessToken = await StorageManager.getItem(LocalStorageKey.AccessToken, true);
    this.currentRefreshToken = await StorageManager.getItem(LocalStorageKey.RefreshToken, true);
    this.expirationTime = moment(await StorageManager.getItem(LocalStorageKey.ExpirationTime, true)).toDate();

    if (this.accessToken) {
      store.dispatch(changeLoggedInState(true));
      this.startRefreshTokenTimer();
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
      this.isTokenValidForRequests = true;
      this.startRefreshTokenTimer();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private startRefreshTokenTimer() {
    this.stopRefreshTokenTimer();

    this.refreshTimer = setTimeout(this.onRefreshTokenTimerElapsed.bind(this),
      this.isTokenValidForRequests ? this.expirationTime.getTime() - new Date().getTime() : RETRY_FOR_VALID_TOKEN_TIMEOUT
    );
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private async onRefreshTokenTimerElapsed() {
    const resultRefreshToken = await this.refreshToken(false);
    this.isTokenValidForRequests = resultRefreshToken;
    this.startRefreshTokenTimer();
  }

  private async refreshToken(logoutOnFail: boolean) {
    try {
      await SessionApi.refreshToken(this.currentRefreshToken);
      // TODO store data
      return true;
    } catch (error) {
      console.error("Refreshing token failed... " + error);
      if (logoutOnFail) {
        await this.logout();
      }
      return false;
    }
  }

  private cacheLoginInfo(response: LoginResponse) {
    this.accessToken = response.result.user.stsTokenManager.accessToken;
    this.currentRefreshToken = response.result.user.stsTokenManager.refreshToken;
    this.expirationTime = moment().add(response.result.user.stsTokenManager.expirationTime, 's').toDate();
  }

  private async saveLoginInfo(response: LoginResponse) {
    const expireDateValue = moment().add(response.result.user.stsTokenManager.expirationTime, 's').toDate();
    await StorageManager.setItem(LocalStorageKey.AccessToken, response.result.user.stsTokenManager.accessToken, true);
    await StorageManager.setItem(LocalStorageKey.RefreshToken, response.result.user.stsTokenManager.refreshToken, true);
    await StorageManager.setItem(LocalStorageKey.ExpirationTime, moment(expireDateValue).format(), true);
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

  private handleAppStateChange(nextAppState: string) {
    if (nextAppState === 'active') {
      console.log('Application came to foreground!');
      if (this.validateCurrentSession()) {
        this.startRefreshTokenTimer();
      }
    } else if (nextAppState === 'background') {
      this.stopRefreshTokenTimer();
    }
  }

  private async validateCurrentSession() {
    if (this.expirationTime) {
      console.log("Expire date exists: " + this.expirationTime);
      if (new Date().getTime() - this.expirationTime.getTime() > 0) {
        console.warn('Expire date is passed, try refresh token');
        const resultRefreshToken = await this.refreshToken(false);
        this.isTokenValidForRequests = resultRefreshToken;
      } else {
        this.isTokenValidForRequests = true;
      }
    }
    return store.getState().sessionReducer.session.loggedIn;
  }

}

const SessionManager = new SessionManagerInstance();
export default SessionManager;
