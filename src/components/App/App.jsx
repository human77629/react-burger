import React from 'react';

import { BurgerPage, LoginPage, SignupPage, PasswordRecoveryPage, PasswordResetPage, ProfilePage } from '../../pages';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

function App() {

  return (
          <Router>
            <Switch>
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
              <ProtectedRoute path="/profile">
                <ProfilePage />
              </ProtectedRoute>                                                 
              <Route path="/">
                <BurgerPage />
              </Route>
            </Switch>
          </Router>
  );
}

export default App;
