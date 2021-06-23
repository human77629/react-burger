import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import Modal from '../Modal/Modal.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import { VIEW_INGREDIENT , getIngredients, makeOrder, ADD_TOPPING, SET_BUN } from '../../services/actions/burger.js';

import './App.css';

function App() {

  const selectedIngredients = useSelector(store=>store.burger.selectedIngredients)

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  const viewedIngredient = useSelector( store => store.burger.viewedIngredient )

  const ingredientsRequest = useSelector ( store => store.burger.ingredientsRequest )
  const ingredientsFailed = useSelector ( store => store.burger.ingredientsFailed )

  const dispatch = useDispatch();

  const handleOpenOrderModal = function () {

    dispatch(makeOrder([...selectedIngredients.toppingIds, selectedIngredients.bunId, selectedIngredients.bunId]))
    setIsOrderModalOpen(true);
  }

  const handleOpenIngredientModal = function (ingredient) {
    dispatch({type: VIEW_INGREDIENT, ingredient: ingredient});
    setIsIngredientModalOpen(true);
  }  

  const closeModals = function () {
    setIsOrderModalOpen(false);
    setIsIngredientModalOpen(false);
    const ingredient = viewedIngredient;
    dispatch({type: ingredient.type==='bun'?SET_BUN:ADD_TOPPING, id: ingredient._id})
  }

  React.useEffect(()=>{

    dispatch(getIngredients());

    const escapeHandler = (event) => event.key === 'Escape' && closeModals();
    document.addEventListener('keydown', escapeHandler);

    return () => document.removeEventListener('keydown', escapeHandler);    
    

  },[dispatch]);


  return (
          <>
          
          <AppHeader />

          <main>
              {!ingredientsRequest && !ingredientsFailed && (
                <>
              <BurgerIngredients handleIngredientClick={handleOpenIngredientModal} />
              <BurgerConstructor handleOrderClick={handleOpenOrderModal} />
                </>
              )}
              {ingredientsRequest && (
                
                <h1 className="text text_type_main-large mt-10">Загрузка данных...</h1>
                
              )}            
              {ingredientsFailed && (
                <h1 className="text text_type_main-large mt-10">Произошла ошибка!</h1>
              )}              

              <Modal isOpen={isOrderModalOpen} closeCallback={closeModals}>    
                <OrderDetails />
              </Modal>
              <Modal isOpen={isIngredientModalOpen} closeCallback={closeModals} header={'Детали ингредиента'}>    
                  {viewedIngredient && (
                <IngredientDetails ingredient={viewedIngredient} />
                  )}            
              </Modal>
          </main>
          </>
  );
}

export default App;
