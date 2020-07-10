export const CHANGE_LOGGED_IN_STATE = 'CHANGE_LOGGED_IN_STATE'

export const changeLoggedInState = (loggedIn: boolean) => {
    return { type: CHANGE_LOGGED_IN_STATE, loggedIn };
}


