
import {store} from './store'
import {TBurgerActions} from './actions/burger'
import {ThunkAction} from 'redux-thunk'
import {Action, ActionCreator} from 'redux'

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TBurgerActions;

export type AppThunk<TReturn=void> = ActionCreator<
    ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;


export type AppDispatch = typeof store.dispatch;