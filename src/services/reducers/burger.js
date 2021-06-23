import {VIEW_INGREDIENT} from '../actions/burger.js'

const initialState = {
    viewedIngredient: {},
    order: {
        id: '',
        status: '',
        ingredientIds: []
    },
    ingredients: [],
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
        default: {
            return state;
        }
    }
}