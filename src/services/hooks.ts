import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
  } from 'react-redux';
  import { AppDispatch, AppThunk, TRootState } from './types';
  
  // Теперь этот хук «знает» структуру хранилища
  export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook; 


  export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 