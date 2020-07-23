import { combineReducers, createStore } from "redux";
import sessionReducers from "./reducer/sessionReducer";
import navigationReducers from "./reducer/navigationReducer";
import cameraReducers from "./reducer/cameraReducer";
import userReducers from "./reducer/userReducer";
import pictureSelectorReducers from "./reducer/pictureSelectorReducer";
import newOfferReducers from "./reducer/newOfferReducer";
import companyOfferReducers from "./reducer/companyOfferReducer";

const rootReducer = combineReducers({
    sessionReducer: sessionReducers,
    navigationReducer: navigationReducers,
    cameraReducer: cameraReducers,
    userReducer: userReducers,
    pictureSelectorReducer: pictureSelectorReducers,
    newOfferReducer: newOfferReducers,
    companyOfferReducer: companyOfferReducers
})

const store = createStore(rootReducer);

export default store;

export type TRootReducer = ReturnType<typeof rootReducer>
