
import {store} from './store'
import {TBurgerActions} from './actions/burger'
import {ThunkAction} from 'redux-thunk'
import {Action, ActionCreator} from 'redux'

import {TUserState} from './reducers/user'
import {TBurgerState} from './reducers/burger'

export type PureStateType = TUserState & TBurgerState;

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TBurgerActions;

export type AppThunk<TReturn=void> = ActionCreator<
    ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;


export type AppDispatch = typeof store.dispatch;

export type TIngredient = {
    image_large:string,
    image_mobile:string,
    image:string,
    name:string,
    calories:number,
    proteins:number,
    fat:number,
    carbohydrates:number,
    _id:string,
    type:string,
    price:number,
    __v:number,
}



export type TOrder = {
    _id:string,
    number:number,
    name:string,
    status:string,
    price?:number
    ingredients:string[],
    createdAt:string,
    updatedAt:string,
    owner: {
        name:string,
        email:string,
        createdAt:string,
        updatedAt:string,
    }
}