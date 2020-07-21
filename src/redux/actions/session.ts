import { Role } from "../../enums/role.enum";

export const CHANGE_LOGGED_IN_STATE = 'CHANGE_LOGGED_IN_STATE'
export const CHANGE_ROLE = 'CHANGE_ROLE'

export const changeLoggedInState = (loggedIn: boolean) => {
    return { type: CHANGE_LOGGED_IN_STATE, loggedIn };
}

export const changeRole = (role: Role) => {
    return { type: CHANGE_ROLE, role };
}


