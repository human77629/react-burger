
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