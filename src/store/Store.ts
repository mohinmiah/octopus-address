import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { locationReducer, LocationState } from "./location/LocationReducer";
import { userReducer, UserState } from "./user/UserReducer";

export interface AppState {
    location: LocationState;
    user: UserState;
}

const rootReducer = combineReducers({
    location: locationReducer,
    user: userReducer
})
export const appStore: Store = createStore(rootReducer, applyMiddleware(thunk));