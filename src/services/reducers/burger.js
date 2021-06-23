import { 
    VIEW_INGREDIENT,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/burger.js'


const initialState = {
    viewedIngredient: {},
    order: {
        id: '',
        status: '',
        ingredientIds: []
    },
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    
    selectedIngredients: [],
}






export const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case VIEW_INGREDIENT: {
            return {
                ...state,
                viewedIngredient: action.ingredient
            }
        }
        case GET_INGREDIENTS_REQUEST: {
            return { ...state, ingredientsRequest: true };
          }
        case GET_INGREDIENTS_SUCCESS: {
        return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
        }
        case GET_INGREDIENTS_FAILED: {
        return { ...state, ingredientsFailed: true, ingredientsRequest: false };
        }        
        default: {
            return state;
        }
    }
}