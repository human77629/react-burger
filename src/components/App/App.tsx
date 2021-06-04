import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import './App.css';
import {sampleData} from '../../utils/data';

function App() {
  return (
          <>
          
          <AppHeader />
         
          <main>
            
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
          </>
  );
}

export default App;
