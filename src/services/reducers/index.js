import { combineReducers } from 'redux';

import { burgerReducer } from "./burger.js";
import { userReducer } from "./user.js";

export const rootReducer = combineReducers({
    burger: burgerReducer,
    user: userReducer,
})