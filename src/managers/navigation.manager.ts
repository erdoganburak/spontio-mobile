import store from "../redux/store";
import { showHeader, showGoBackButton, showHeaderLogo, changeCurrentRoute, showDrawer } from '../redux/actions/navigation';
import { translate } from "./language.manager";

/**
 * Manages navigation actions.
 */
export class NavigationManagerInstance {

  private _currentRouteName: string;
 
  public get currentRouteName(): string {
    return this._currentRouteName;
  }
  
  public set currentRouteName(value: string) {
    this._currentRouteName = value;
  }

  /**
  * Manages header styling.
  * 
  * @param _showHeader Decides if header is visible.
  * @param _showHeaderLogo Decides if logo is visible.
  * @param _showGoBackButton Decides if go back button is visible.
  * @param _showDrawer Decides if drawer navigation is visible.
  */
  public setHeaderOptions(_showHeader: boolean, _showHeaderLogo: boolean, _showGoBackButton: boolean, _showDrawer: boolean): void {
    this.showHeader(_showHeader);
    this.showHeaderLogo(_showHeaderLogo);
    this.showGoBackButton(_showGoBackButton);
    this.showDrawer(_showDrawer);
  }


  /**
  * Decides if header logo is visible.
  * 
  * @param _showHeader Decides if header logo is visible.
  */
  public showHeaderLogo(_showHeaderLogo: boolean) {
    store.dispatch(showHeaderLogo(_showHeaderLogo));
  }

  /**
  * Decides if header is visible.
  * 
  * @param _showHeader Decides if header is visible.
  */
  public showHeader(_showHeader: boolean) {
    store.dispatch(showHeader(_showHeader));
  }

  /**
  * Decides if back button is visible. 
  * 
  * @param _showHeader Decides if back button is visible.
  */
  public showGoBackButton(_showGoBackButton: boolean) {

    // TODO Go back button is only avaliable on iOS ??

    /* if (Platform.OS === 'android') {
       store.dispatch(showGoBackButton(false));
     } else if (Platform.OS === 'ios') {
       store.dispatch(showGoBackButton(_showGoBackButton));
     }*/

    store.dispatch(showGoBackButton(_showGoBackButton));
  }

  /**
  *  Decides if drawer navigation is visible.. 
  * 
  * @param _showDrawer Decides if drawer navigation is visible.
  */
  public showDrawer(_showDrawer: boolean) {
    store.dispatch(showDrawer(_showDrawer));
  }

  /**
	 * Crawl through navigation state to get route metadata.
	 *
	 * @param {*} navigationState
	 * @returns {*}
	 */
  public getActiveRouteMetadata(navigationState) {
    if (!navigationState) {
      return null;
    }

    const route = navigationState.routes[navigationState.index];

    // Dive into nested navigators as long we haven't reach current screen.
    if (route.routes) {
      return this.getActiveRouteMetadata(route);
    }
    return route;
  }

  /**
  * Sets curret route name. Also manages navigation styling.
  * TODO Divide into seperate functions...
  * 
  * @param {*} navigationState
  */
  public setCurrentRoute(navigationState): void {
    let currentRoute = this.getActiveRouteMetadata(navigationState);
    if (currentRoute && currentRoute.name) {
      console.log("Current route is => " + currentRoute.name);
      this.currentRouteName = currentRoute.name;
      store.dispatch(changeCurrentRoute(currentRoute.name));
      this.manageNavigationActions(currentRoute.name);
    }
  }

  /**
  * Manage navigation actions.
  *
  * @param {*} routeName
  */
  private manageNavigationActions(routeName: string): void {
    switch (routeName) {
      case translate("navigation.login"):
        this.setHeaderOptions(true, false, true, false);
        break;
      case translate("navigation.settings"):
        this.setHeaderOptions(true, true, false, true);
        break;
      case translate("navigation.help"):
        this.setHeaderOptions(true, true, false, true);
        break;
      case translate("navigation.my_offers"):
        this.setHeaderOptions(true, true, false, true);
        break;
      case translate("navigation.new_offer"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.language_selection"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.user_profile"):
        this.setHeaderOptions(true, true, false, true);
        break;
      case translate("navigation.who_we_are"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.social_media"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.faq"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.terms_of_use"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.contact_us"):
        this.setHeaderOptions(true, true, true, false);
        break;
      case translate("navigation.privacy"):
        this.setHeaderOptions(true, true, true, false);
        break;
      default:
        break;
    }
  }

}

const NavigationManager = new NavigationManagerInstance();
export default NavigationManager;
