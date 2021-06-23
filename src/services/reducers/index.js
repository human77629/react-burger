import { combineReducers } from 'redux';

import { burgerReducer } from "./burger.js";


export const rootReducer = combineReducers({
    burger: burgerReducer,
})