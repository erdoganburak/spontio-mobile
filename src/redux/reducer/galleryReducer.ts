import { CHANGE_PICTURE, SHOW_GALLERY } from "../actions/gallery";

export class Gallery {
    showGallery: boolean;
    picture: string;
    constructor() {

    }
}

const initialState = {
    gallery: new Gallery()
}

const galleryReducers = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PICTURE:
            return {
                gallery: { ...state.gallery, picture: action.picture }
            };
        case SHOW_GALLERY:
            return {
                gallery: { ...state.gallery, showGallery: action.showGallery }
            };
        default:
            return state;
    }
}

export default galleryReducers;

