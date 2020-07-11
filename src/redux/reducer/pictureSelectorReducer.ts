import { SHOW_PICTURE_SELECTOR } from "../actions/pictureSelector";

export class PictureSelectorObject {
    showPictureSelectorModal: boolean
    constructor() {
    }
}

const initialState = {
    pictureSelectorObject: new PictureSelectorObject()
}

const pictureSelectorReducers = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PICTURE_SELECTOR:
            return {
                pictureSelectorObject: { ...state.pictureSelectorObject, showPictureSelectorModal: action.showPictureSelectorModal }
            };
        default:
            return state;
    }
}

export default pictureSelectorReducers;

