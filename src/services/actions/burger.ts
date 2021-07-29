import { getIngredientsRequest, makeOrderRequest, ensureToken, fakeGetOrdersRequest } from '../api.js'
import { TIngredient, TOrder } from '../reducers/burger.js';
import {AppThunk, AppDispatch} from '../types'

import { USER_UPDATE_TOKEN } from './user';

export const VIEW_INGREDIENT:'VIEW_INGREDIENT' = 'VIEW_INGREDIENT';
export const VIEW_ORDER:'VIEW_ORDER' = 'VIEW_ORDER';

export const GET_INGREDIENTS_REQUEST:'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED:'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const GET_ORDERS_REQUEST:'GET_ORDERS_REQUEST' = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS:'GET_ORDERS_SUCCESS' = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILED:'GET_ORDERS_FAILED' = 'GET_ORDERS_FAILED';

export const MAKE_ORDER_REQUEST:'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS:'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED:'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED';

export const ADD_TOPPING:'ADD_TOPPING' = 'ADD_TOPPING';
export const REMOVE_TOPPING:'REMOVE_TOPPING' = 'REMOVE_TOPPING';
export const SET_BUN:'SET_BUN' = 'SET_BUN';

export const MOVE_TOPPING:'MOVE_TOPPING' = 'MOVE_TOPPING';


export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_ORDERS:'WS_GET_ORDERS' = 'WS_GET_ORDERS';


export interface IViewIngredient {
	readonly type: typeof VIEW_INGREDIENT;
  ingredient: TIngredient;
}

export interface IViewOrder {
	readonly type: typeof VIEW_ORDER;
  order: TOrder;
}

export interface IGetIngredientsRequest {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: TIngredient[];
}

export interface IGetIngredientsFailed {
	readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetOrdersRequest {
	readonly type: typeof GET_ORDERS_REQUEST;
}

export interface IGetOrdersSuccess {
	readonly type: typeof GET_ORDERS_SUCCESS;
  orders: TOrder[];  
}

export interface IGetOrdersFailed {
	readonly type: typeof GET_ORDERS_FAILED;
}

export interface IMakeOrderRequest {
	readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderSuccess {
	readonly type: typeof MAKE_ORDER_SUCCESS;
  data: {
    name:string;
    order: {
      number: string;
    };
  }
}

export interface IMakeOrderFailed {
	readonly type: typeof MAKE_ORDER_FAILED;
}

export interface IAddTopping {
	readonly type: typeof ADD_TOPPING;
  id:string;
}

export interface IRemoveTopping {
	readonly type: typeof REMOVE_TOPPING;
  index:number;
}

export interface ISetBun {
	readonly type: typeof SET_BUN;
  id:string;
}

export interface IMoveTopping {
	readonly type: typeof MOVE_TOPPING;
  currentIndex:number;
  targetIndex:number;
}

export interface IWSConnectionClosed {
	readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSConnectionError {
	readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionStart {
	readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccess {
	readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSGetOrders {
	readonly type: typeof WS_GET_ORDERS;
  message: {orders: TOrder[];total:number;totalToday:number};
}



export type TBurgerActions =
	IViewIngredient |
	IViewOrder |
	IGetIngredientsRequest |
	IGetIngredientsSuccess |
	IGetIngredientsFailed |
	IGetOrdersRequest |
	IGetOrdersSuccess |
	IGetOrdersFailed |
	IMakeOrderRequest |
	IMakeOrderSuccess |
	IMakeOrderFailed |
	IAddTopping |
	IRemoveTopping |
	ISetBun |
	IMoveTopping |
	IWSConnectionClosed |
	IWSConnectionError |
	IWSConnectionStart |
	IWSConnectionSuccess |
	IWSGetOrders;



export const getOrders:AppThunk = () => {
  return function(dispatch:AppDispatch) {
    dispatch({
      type: GET_ORDERS_REQUEST
    });
    fakeGetOrdersRequest().then(res=>{

      dispatch({
          type: GET_ORDERS_SUCCESS,
          orders: res.data
        });
    }).catch((err) => {
        dispatch({
          type: GET_ORDERS_FAILED
        });
      }
    );
  };
}


export const getIngredients:AppThunk = () => {
  return function(dispatch:AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest().then(res => {
      if (res && res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }).then(res=>{
      dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
    }).catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    );
  };
}


export const makeOrder:AppThunk = (params: {token:string, ingredients:string[]}) => {
  return function(dispatch:AppDispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    });
    ensureToken(makeOrderRequest, params).then(res => {
      dispatch({
          type: MAKE_ORDER_SUCCESS,
          data: res
        });
        if (res.accessToken) dispatch({type: USER_UPDATE_TOKEN, token: res.accessToken})
        if (res.refreshToken) localStorage.setItem('token', res.refreshToken)
    }).catch((err) => {

        dispatch({
          type: MAKE_ORDER_FAILED
        });
      }
    );
  };
}