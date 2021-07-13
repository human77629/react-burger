import { getIngredientsRequest, makeOrderRequest } from '../api.js'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_TOPPING = 'REMOVE_TOPPING';
export const SET_BUN = 'SET_BUN';

export const MOVE_TOPPING = 'MOVE_TOPPING';


export function getIngredients() {
  return function(dispatch) {
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


export function makeOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST
    });
    makeOrderRequest(ingredients).then(res => {
      if (res && res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }).then(res=>{
      dispatch({
          type: MAKE_ORDER_SUCCESS,
          data: res
        });
    }).catch((err) => {
      console.log(err);
        dispatch({
          type: MAKE_ORDER_FAILED
        });
      }
    );
  };
}