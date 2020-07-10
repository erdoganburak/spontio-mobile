export const SHOW_GO_BACK_BUTTON = 'SHOW_GO_BACK_BUTTON'
export const SHOW_HEADER = 'SHOW_HEADER'
export const SHOW_HEADER_LOGO = 'SHOW_HEADER_LOGO'
export const SHOW_DRAWER = 'SHOW_DRAWER'
export const CHANGE_CURRENT_ROUTE = 'CHANGE_CURRENT_ROUTE'

export const showGoBackButton = (showGoBackButton: boolean) => {
    return { type: SHOW_GO_BACK_BUTTON, showGoBackButton };
}

export const showHeader = (showHeader: boolean) => {
    return { type: SHOW_HEADER, showHeader };
}

export const showHeaderLogo = (showHeaderLogo: boolean) => {
    return { type: SHOW_HEADER_LOGO, showHeaderLogo };
}

export const showDrawer = (showDrawer: boolean) => {
    return { type: SHOW_DRAWER, showDrawer };
}

export const changeCurrentRoute = (currentRoute: string) => {
    return { type: CHANGE_CURRENT_ROUTE, currentRoute };
}


