import { applyMiddleware, combineReducers, createStore } from "redux";
import sessionReducers from "./reducer/sessionReducer";
import navigationReducers from "./reducer/navigationReducer";
import cameraReducers from "./reducer/cameraReducer";
import userReducers from "./reducer/userReducer";
import pictureSelectorReducers from "./reducer/pictureSelectorReducer";
import newOfferReducers from "./reducer/newOfferReducer";
import thunk, { ThunkMiddleware } from "redux-thunk";

const rootReducer = combineReducers({
    sessionReducer: sessionReducers,
    navigationReducer: navigationReducers,
    cameraReducer: cameraReducers,
    userReducer: userReducers,
    pictureSelectorReducer: pictureSelectorReducers,
    newOfferReducer: newOfferReducers
})

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware));

export default store;

export type TRootReducer = ReturnType<typeof rootReducer>
