import React from 'react';
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import './App.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {sampleData} from './utils/data';

const sd = sampleData[3];

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
