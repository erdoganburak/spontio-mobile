import { combineReducers, createStore } from "redux";
import sessionReducers from "./reducer/sessionReducer";
import navigationReducers from "./reducer/navigationReducer";
import cameraReducers from "./reducer/cameraReducer";
import userReducers from "./reducer/userReducer";
import galleryReducers from "./reducer/galleryReducer";

const rootReducer = combineReducers({
    sessionReducer: sessionReducers,
    navigationReducer: navigationReducers,
    cameraReducer: cameraReducers,
    userReducer: userReducers,
    galleryReducer: galleryReducers
})

const store = createStore(rootReducer);

export default store;

export type TRootReducer = ReturnType<typeof rootReducer>
