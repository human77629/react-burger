import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import './App.css';

import {sampleData} from '../../utils/data.js'
import {sampleOrder} from '../../utils/order.js'

function App() {
  return (
          <>
          
          <AppHeader />
         
          <main>
            
            <BurgerIngredients ingredients={sampleData} selectedIngredients={sampleOrder} />
            <BurgerConstructor ingredients={sampleData} selectedIngredients={sampleOrder} />
          </main>
          </>
  );
}

export default App;
