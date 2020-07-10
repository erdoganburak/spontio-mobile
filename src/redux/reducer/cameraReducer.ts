import { SHOW_CAMERA, CHANGE_PICTURE, SHOW_TAKEN_PICTURE } from "../actions/camera";

export class Camera {
    showCamera: boolean;
    picture: string;
    showTakenPicture: boolean;
    constructor() {
        this.showCamera = false;
        this.showTakenPicture = false;
    }
}

const initialState = {
    camera: new Camera()
}

const cameraReducers = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CAMERA:
            return {
                camera: { ...state.camera, showCamera: action.showCamera }
            };
        case CHANGE_PICTURE:
            return {
                camera: { ...state.camera, picture: action.picture }
            };
        case SHOW_TAKEN_PICTURE:
            return {
                camera: { ...state.camera, showTakenPicture: action.showTakenPicture }
            };
        default:
            return state;
    }
}

export default cameraReducers;

