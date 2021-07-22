import { 
    VIEW_INGREDIENT,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    REMOVE_TOPPING,
    ADD_TOPPING,
    SET_BUN,
    MAKE_ORDER_REQUEST,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_FAILED,
    GET_ORDERS_REQUEST,
    GET_ORDERS_FAILED,
    GET_ORDERS_SUCCESS,
    MOVE_TOPPING,
    VIEW_ORDER,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
} from '../actions/burger.js'

const initialState = {
    viewedIngredient: {
        image_large: '',
        name: '',
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
    },

    order: {
        number: '',
        status: '',
        generatedBurgerName: '',
        ingredientIds: []
    },
    orderRequest: false,
    orderFailed: false,

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    orders: [],
    ordersRequest: false,
    ordersFailed: false,    

    viewedOrder: {
        status: '',
        name: '',
        number: 0,
        price: 0,
    },

    totalOrderCount: 0,
    todayOrderCount: 0,

    orderSocketStatus: 'disconnected',
    
    selectedIngredients: {bunId: '', toppingIds: []},
}






export const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case VIEW_INGREDIENT: {
            return { ...state, viewedIngredient: action.ingredient };
        }
        case VIEW_ORDER: {
            return { ...state, viewedOrder: action.order };
        }        

        case GET_ORDERS_REQUEST: {
            return { ...state, ordersRequest: true, ordersFailed: false };
        }
        case GET_ORDERS_SUCCESS: {
            return { ...state, ordersFailed: false, orders: action.orders, ordersRequest: false };
        }
        case GET_ORDERS_FAILED: {
            return { ...state, ordersFailed: true, ingredients: [...initialState.ingredients], ordersRequest: false };
        }          

        case WS_GET_ORDERS: {
            return { ...state, orders: action.message.orders, totalOrderCount: action.message.total, todayOrderCount: action.message.totalToday }
        }

        case WS_CONNECTION_CLOSED: {
            return { ...state, orderSocketStatus: 'disconnected'}
        }

        case WS_CONNECTION_ERROR: {
            return { ...state, orderSocketStatus: 'error'}
        }

        case WS_CONNECTION_SUCCESS: {
            return { ...state, orderSocketStatus: 'connected'}
        }

        case WS_CONNECTION_START: {
            return { ...state, orderSocketStatus: 'connecting'}
        }

        case GET_INGREDIENTS_REQUEST: {
            return { ...state, ingredientsRequest: true };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
        }
        case GET_INGREDIENTS_FAILED: {
            return { ...state, ingredientsFailed: true, ingredients: [...initialState.ingredients], ingredientsRequest: false };
        }        

        case MAKE_ORDER_REQUEST: {
            return { ...state, orderRequest: true, orderFailed: false };
        }
        case MAKE_ORDER_SUCCESS: {
            return { ...state, orderFailed: false, order: {number: action.data.order.number, generatedBurgerName: action.data.name}, selectedIngredients: initialState.selectedIngredients, orderRequest: false };
        }
        case MAKE_ORDER_FAILED: {
            return { ...state, orderFailed: true, order: {...initialState.order}, orderRequest: false };
        }        


        case ADD_TOPPING: {
            return { 
                ...state, 
                selectedIngredients: {
                    ...state.selectedIngredients, 
                    toppingIds: [
                        action.id,
                        ...state.selectedIngredients.toppingIds, 
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


        case MOVE_TOPPING: {
            const toppings = [...state.selectedIngredients.toppingIds]
            const movedTopping = toppings.splice(action.currentIndex,1)[0];
            toppings.splice(action.targetIndex,0,movedTopping);
            return {
                ...state,
                selectedIngredients: {
                    ...state.selectedIngredients,   
                    toppingIds: toppings                    
                }
            }
        }
        default: {
            return state;
        }
    }
}