import { 
    VIEW_INGREDIENT,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    REMOVE_TOPPING,
    ADD_TOPPING,
    SET_BUN,
} from '../actions/burger.js'


const initialState = {
    viewedIngredient: {},

    order: {
        id: '',
        status: '',
        ingredientIds: []
    },
    orderRequest: false,
    orderFailed: false,

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    
    selectedIngredients: {bunId: '', toppingIds: []},
}






export const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case VIEW_INGREDIENT: {
            return { ...state, viewedIngredient: action.ingredient };
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

        case ADD_TOPPING: {
            return { 
                ...state, 
                selectedIngredients: {
                    ...state.selectedIngredients, 
                    toppingIds: [
                        ...state.selectedIngredients.toppingIds, 
                        action.id
                    ]
                } 
            }
        }

        case SET_BUN: {
            return { 
                ...state, 
                selectedIngredients: {
                    ...state.selectedIngredients, 
                    bunId: action.id
                } 
            }
        }        

        case REMOVE_TOPPING: {
            return { 
                ...state, 
                selectedIngredients: {
                    ...state.selectedIngredients,   
                    toppingIds: 
                    [...state.selectedIngredients.toppingIds]
                    .filter((ingredient, index) => (index !== action.index))
                }
            }
        }
        default: {
            return state;
        }
    }
}