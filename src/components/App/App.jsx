import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader.jsx'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'
import Modal from '../Modal/Modal.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import { VIEW_INGREDIENT , getIngredients, ADD_TOPPING, SET_BUN } from '../../services/actions/burger.js';

import './App.css';

const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';


function App() {

  const [orderFetchState, setOrderFetchState] = React.useState({
    loading: false,
    error: false,
    loaded: false
  });  


  const [order, setOrder] = React.useState({toppingIds: []});  

  const selectedIngredients = useSelector(store=>store.burger.selectedIngredients)

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  const viewedIngredient = useSelector( store => store.burger.viewedIngredient )

  const ingredientsRequest = useSelector ( store => store.burger.ingredientsRequest )
  const ingredientsFailed = useSelector ( store => store.burger.ingredientsFailed )

  const dispatch = useDispatch();

  const handleOpenOrderModal = function () {

    setOrderFetchState({loading: true, loaded: false, error: false}); 

    
    fetch(ORDER_API_URL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: [selectedIngredients.bunId, selectedIngredients.bunId, ...selectedIngredients.toppingIds]})
    })
    .then(res=> {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(res=>{
      setOrder({...order, id: res.order.number});
      setOrderFetchState({loading: false, loaded: true, error: false});
    })
    .catch((err)=>{
      setOrderFetchState({loading: false, loaded: false, error: true});
    });

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
                <OrderDetails orderFetchState={orderFetchState} />
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
