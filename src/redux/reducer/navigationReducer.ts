import { SHOW_GO_BACK_BUTTON, SHOW_HEADER, SHOW_HEADER_LOGO, CHANGE_CURRENT_ROUTE, SHOW_DRAWER } from "../actions/navigation";

export class NavigationProperty {
    showGoBackButton: boolean;
    showHeader: boolean;
    showHeaderLogo: boolean;
    showDrawer: boolean
    currentRoute: string;

    constructor() {
        this.showGoBackButton = false;
        this.showHeader = false;
        this.showHeaderLogo = false;
        this.showDrawer = false;
    }
}

const initialState = {
    navigationProperty: new NavigationProperty()
}

const navigationReducers = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_GO_BACK_BUTTON:
            return {
                navigationProperty: { ...state.navigationProperty, showGoBackButton: action.showGoBackButton }
            };
        case SHOW_HEADER:
            return {
                navigationProperty: { ...state.navigationProperty, showHeader: action.showHeader }
            };
        case SHOW_HEADER_LOGO:
            return {
                navigationProperty: { ...state.navigationProperty, showHeaderLogo: action.showHeaderLogo }
            };
        case SHOW_DRAWER:
            return {
                navigationProperty: { ...state.navigationProperty, showDrawer: action.showDrawer }
            };
        case CHANGE_CURRENT_ROUTE:
            return {
                navigationProperty: { ...state.navigationProperty, currentRoute: action.currentRoute }
            };
        default:
            return state;
    }
}

export default navigationReducers;

