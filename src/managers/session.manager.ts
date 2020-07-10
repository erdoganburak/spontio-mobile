import { changeLoggedInState } from "../redux/actions/session";
import store from "../redux/store";
import StorageManager from "./storage.manager";
import { LocalStorageKey } from "../enums/localStorageKey.enum";
import RNRestart from "react-native-restart";

/**
 * Manages session information.
 */
export class SessionManagerInstance {

  /**
  * Initializes necessary information when program executes for the first time.
  */
  public async initializeApp() {
    store.dispatch(changeLoggedInState(false));

  }

  /**
  * Performs logout actions.
  */
  public async logout() {

    //Reset redux.
    store.dispatch(changeLoggedInState(false));

    // Clear local storage.
    await StorageManager.removeItem(LocalStorageKey.Language);

    // Finally restart app.
    RNRestart.Restart();
  }

}

const SessionManager = new SessionManagerInstance();
export default SessionManager;
