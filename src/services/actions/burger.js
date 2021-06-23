import { getIngredientsRequest } from '../api.js'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_TOPPING = 'REMOVE_TOPPING';
export const SET_BUN = 'SET_BUN';




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
          dispatch({
              type: SET_BUN,
              id: res.data.find(i=>(i.type==='bun'))._id
          })
     }).catch((err) => {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      );
    };
  }