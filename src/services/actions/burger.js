import { getIngredientsRequest } from '../api.js'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';




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