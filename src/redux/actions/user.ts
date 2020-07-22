export const CHANGE_USER_PROFILE_PICTURE = 'CHANGE_USER_PROFILE_PICTURE'
export const CHANGE_COMPANY_PROFILE_PICTURE = 'CHANGE_COMPANY_PROFILE_PICTURE'
export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export const changeUserProfilePicture = (userProfilePicture: string) => {
    return { type: CHANGE_USER_PROFILE_PICTURE, userProfilePicture };
}

export const changeCompanyProfilePicture = (companyProfilePicture: string) => {
    return { type: CHANGE_COMPANY_PROFILE_PICTURE, companyProfilePicture };
}

export const changeUsername = (username: string) => {
    return { type: CHANGE_USERNAME, username };
}

export const changePassword = (password: string) => {
    return { type: CHANGE_PASSWORD, password };
}






