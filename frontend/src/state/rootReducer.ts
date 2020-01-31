import { combineReducers } from "redux";
import userReducer, { userState } from "./user/reducer";
import { connectRouter } from "connected-react-router";

export interface State {
    user: userState;
}

const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user: userReducer
});

export default rootReducer;