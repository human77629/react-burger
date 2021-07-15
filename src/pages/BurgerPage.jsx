import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import AppHeader from '../components/AppHeader/AppHeader.jsx'
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients.jsx'
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor.jsx'
import Modal from '../components/Modal/Modal.jsx';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails.jsx';
import OrderDetails from '../components/OrderDetails/OrderDetails.jsx';
import { VIEW_INGREDIENT , getIngredients, makeOrder } from '../services/actions/burger.js';
import { userInfo } from '../services/actions/user.js';

import './BurgerPage.css';

export function BurgerPage() {

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = React.useState(false);  

  const {selectedIngredients, viewedIngredient, ingredientsRequest, ingredientsFailed} = useSelector(store=>store.burger)

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const accessToken = useSelector(store=>store.user.accessToken)
  React.useEffect(()=>{
      console.log('before userinfo')
      dispatch(userInfo(accessToken))
  }, [accessToken, dispatch])     
  const user = useSelector(store=>store.user.user)

  const handleOpenOrderModal = function () {
    if (selectedIngredients.bunId === '' || selectedIngredients.toppingIds.length === 0) {
      
      
      setIsErrorModalOpen(true);
    
    } else if (user.name==='') {
      history.replace({pathname: '/login', state:{from: '/'}})
    } else {
      console.log(accessToken)
      dispatch(makeOrder({token: accessToken, ingredients: [...selectedIngredients.toppingIds, selectedIngredients.bunId, selectedIngredients.bunId]}))
      setIsOrderModalOpen(true);
    }
  }

  const handleOpenIngredientModal = function (ingredient) {
    history.replace({pathname: `/ingredients/${ingredient._id}`, state: {background: location}})
    dispatch({type: VIEW_INGREDIENT, ingredient: ingredient});
    setIsIngredientModalOpen(true);
  }

  const closeModals = function () {
    setIsOrderModalOpen(false);
    setIsIngredientModalOpen(false);
    setIsErrorModalOpen(false);
    history.replace({pathname: '/'})
  }

  React.useEffect(()=>{

    dispatch(getIngredients());

    const escapeHandler = (event) => event.key === 'Escape' && closeModals();
    document.addEventListener('keydown', escapeHandler);

    return () => document.removeEventListener('keydown', escapeHandler);    
    

  },[dispatch]);


  return (
          
        <DndProvider backend={HTML5Backend}>          
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

              <Modal isOpen={isErrorModalOpen} closeCallback={closeModals} header={'Пустой бургер!'}>    
                <p className="text text_type_main-default p-10">
                  Согласно межгалактическим конвенциям мы не имеем права готовить бургеры без начинок или булок. <br />Пожалуйста, выберите булку и хотя бы одну начинку!
                </p>
              </Modal>              
          </main>
        </DndProvider>
  );
}
