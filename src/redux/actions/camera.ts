export const SHOW_CAMERA = 'SHOW_CAMERA'
export const CHANGE_PICTURE = 'CHANGE_PICTURE'
export const SHOW_TAKEN_PICTURE = 'SHOW_TAKEN_PICTURE'

export const showCamera = (showCamera: boolean) => {
    return { type: SHOW_CAMERA, showCamera };
}

export const changePicture = (picture: string) => {
    return { type: CHANGE_PICTURE, picture };
}

export const showTakenPicture = (showTakenPicture: boolean) => {
    return { type: SHOW_TAKEN_PICTURE, showTakenPicture };
}

