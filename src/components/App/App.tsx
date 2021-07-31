import React from 'react';

import { BurgerPage, LoginPage, SignupPage, PasswordRecoveryPage, PasswordResetPage, ProfilePage, IngredientPage, OrderPage, FeedPage } from '../../pages';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import {useHistory, useLocation} from 'react-router-dom'
import { useSelector } from '../../services/hooks';

import {Route, Switch} from 'react-router-dom';

import Modal from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {Location} from 'history'
import {TRootState} from '../../services/types'


import './App.css';

interface LocationState {
  background: Location<unknown>,
  modalHeader: string,
}

const App:React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const background:Location<unknown> | undefined = history.action === 'REPLACE' && location.state?.background || undefined; 
  

  const closeAllModals = () => {
    if (background) history.replace({pathname: background.pathname})
  }

  const {ingredients, viewedOrder, viewedIngredient} = useSelector(store=>store.burger)


  React.useEffect(()=>{
    const escapeHandler = (event:KeyboardEvent) => event.key === 'Escape' && closeAllModals();
    document.addEventListener('keydown', escapeHandler);
    return () => document.removeEventListener('keydown', escapeHandler);         
  }, [location])
  
  return (
          <>
            {background && (
              <Switch>
                <Modal isOpen={!!background} closeCallback={closeAllModals} header={location.state.modalHeader}>
                  <ProtectedRoute path="/profile/orders/:id">
                    <OrderDetails ingredients={ingredients} order={viewedOrder}/>
                  </ProtectedRoute>
                  <Route path="/feed/:id">
                    <OrderDetails ingredients={ingredients} order={viewedOrder}/>
                  </Route>                         
                  <Route path="/ingredients/:id">
                    <IngredientDetails ingredient={viewedIngredient}/>
                  </Route>                     
                </Modal>
              </Switch>
            )}
            <Switch location={background || location}>
              <Route path="/login">
                <LoginPage />
              </Route>           
              <Route path="/register">
                <SignupPage />
              </Route>        
              <Route path="/forgot-password">
                <PasswordRecoveryPage />
              </Route>          
              <Route path="/reset-password">
                <PasswordResetPage />
              </Route> 
              <ProtectedRoute path="/profile/orders/:id">
                <OrderPage />
              </ProtectedRoute>                
              <ProtectedRoute path="/profile">
                <ProfilePage />
              </ProtectedRoute>      
              <Route path="/feed/:id">
                <OrderPage />
              </Route>                      
              <Route path="/feed">
                <FeedPage />
              </Route>                                                         
              <Route exact path="/">
                <BurgerPage />
              </Route>
              <Route path="/ingredients/:id">
                <IngredientPage />
              </Route>               
            </Switch>
          </>
  );
}

export default App;
