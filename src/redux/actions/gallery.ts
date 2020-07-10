export const CHANGE_PICTURE = 'CHANGE_PICTURE'
export const SHOW_GALLERY = 'SHOW_GALLERY'

export const changePicture = (picture: string) => {
    return { type: CHANGE_PICTURE, picture };
}

export const showGallery = (showGallery: boolean) => {
    return { type: SHOW_GALLERY, showGallery };
}


