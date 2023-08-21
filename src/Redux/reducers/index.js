import { combineReducers } from "redux";
import { UserReducer } from "./userReducers";

const rootReducer = combineReducers({user:UserReducer});
export default rootReducer;