export const CHANGE_USER_PROFILE_PICTURE = 'CHANGE_USER_PROFILE_PICTURE'

export const changeUserProfilePicture = (profilePicture: string) => {
    return { type: CHANGE_USER_PROFILE_PICTURE, profilePicture };
}


