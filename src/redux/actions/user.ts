import { Company, StandartUser } from "../reducer/userReducer"

export const CHANGE_PROFILE_PICTURE = 'CHANGE_PROFILE_PICTURE'
export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const UPDATE_COMPANY = 'UPDATE_COMPANY'
export const UPDATE_STANDART_USER = 'UPDATE_STANDART_USER'

export const changeProfilePicture = (picture_id: string) => {
    return { type: CHANGE_PROFILE_PICTURE, picture_id };
}

export const changeEmail = (email: string) => {
    return { type: CHANGE_EMAIL, email };
}

export const changePassword = (password: string) => {
    return { type: CHANGE_PASSWORD, password };
}

export const updateCompany = (company: Company) => {
    return { type: UPDATE_COMPANY, company };
}

export const updateStandartUser = (standartUser: StandartUser) => {
    return { type: UPDATE_STANDART_USER, standartUser };
}




