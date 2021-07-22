import React from 'react';

import { BurgerPage, LoginPage, SignupPage, PasswordRecoveryPage, PasswordResetPage, ProfilePage, IngredientPage, OrderPage, FeedPage } from '../../pages';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import {useHistory, useLocation} from 'react-router-dom'

import {Route, Switch} from 'react-router-dom';

import './App.css';

function App() {
  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'REPLACE' && location.state && location.state.background; 
  
  return (
          
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
          
  );
}

export default App;
