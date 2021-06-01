import React from 'react';
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
          <>
          <AppHeader />
          <main>
            <BurgerIngredients />
            <BurgerIngredients />
          </main>
          </>
  );
}

export default App;
