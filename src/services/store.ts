import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middlewares';
import thunkMiddleware from 'redux-thunk';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS
} from './actions/burger';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};


 const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware,socketMiddleware(wsUrl, wsActions)))
  );

  export const store = initStore()

