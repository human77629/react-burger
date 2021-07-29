import {
    TypedUseSelectorHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { TRootState } from './types';
  
  // Теперь этот хук «знает» структуру хранилища
  export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook; 