import { changeLoggedInState } from "../redux/actions/session";
import store from "../redux/store";
import StorageManager from "./storage.manager";
import { LocalStorageKey } from "../enums/localStorageKey.enum";
import RNRestart from "react-native-restart";
import LoginResponse from "../models/login/loginResponse.model";
import moment from 'moment';
import { AppState } from "react-native";
import BaseApi from "../api/base.api";

const RETRY_FOR_VALID_TOKEN_TIMEOUT = 60000;

/**
 * Manages session information.
 */
export class SessionManagerInstance {

  private refreshTimer: number;
  private _isTokenValidForRequests: boolean;

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

    BaseApi.currentRefreshToken = await StorageManager.getItem(LocalStorageKey.RefreshToken, true);
    BaseApi.expirationTime = moment(await StorageManager.getItem(LocalStorageKey.ExpirationTime, true)).toDate();

    if (BaseApi.currentRefreshToken) {
      this.startRefreshTokenTimer();
    }

  }

  public startRefreshTokenTimer() {
    this.stopRefreshTokenTimer();
    this.refreshTimer = setTimeout(this.onRefreshTokenTimerElapsed.bind(this),
      this.isTokenValidForRequests ? BaseApi.expirationTime.getTime() - new Date().getTime() : RETRY_FOR_VALID_TOKEN_TIMEOUT
    );
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private async onRefreshTokenTimerElapsed() {
    const resultRefreshToken = await this.refreshToken(true);
    this.isTokenValidForRequests = resultRefreshToken;
    this.startRefreshTokenTimer();
  }

  private async refreshToken(logoutOnFail: boolean) {
    try {
      await BaseApi.refreshToken();
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

  public cacheLoginInfo(response: LoginResponse) {
    BaseApi.currentRefreshToken = response.result.user.stsTokenManager.refreshToken;
    BaseApi.expirationTime = moment().add(response.result.user.stsTokenManager.expirationTime, 's').toDate();
  }

  public async saveLoginInfo(response: LoginResponse) {
    const expireDateValue = moment().add(response.result.user.stsTokenManager.expirationTime, 's').toDate();
    await StorageManager.setItem(LocalStorageKey.RefreshToken, response.result.user.stsTokenManager.refreshToken, true);
    await StorageManager.setItem(LocalStorageKey.ExpirationTime, moment(expireDateValue).format(), true);
  }

  /**
  * Performs logout actions.
  */
  public async logout() {

    //Reset redux.
    store.dispatch(changeLoggedInState(false));

    // Clear local storage.
    await StorageManager.removeItem(LocalStorageKey.Language, true);
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
    if (BaseApi.expirationTime) {
      console.log("Expire date exists: " + BaseApi.expirationTime);
      if (new Date().getTime() - BaseApi.expirationTime.getTime() > 0) {
        console.warn('Expire date is passed, try refresh token');
        const resultRefreshToken = await this.refreshToken(true);
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
