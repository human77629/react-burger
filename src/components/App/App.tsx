import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal';
import './App.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import {IngredientsContext, OrderContext} from '../../services/burgerContext';

const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';

interface Ingredient {

      image: string,
      price: number,
      name: string,
      _id: string,
      type: string

}

interface Order {
  bunId?: string,
  toppingIds: string[],
  id?: string
}



const mockupOrder = (ingredients:Ingredient[]) => {
  const buns = ingredients.filter(ingredient=>(ingredient.type==='bun'));
  const nonBuns = ingredients.filter(ingredient=>!(ingredient.type==='bun'));
  const selectedBun = buns[Math.floor(Math.random() * buns.length)]._id;
  const selectedToppings = [1,2,3,4,5,6,7,8,9,10].map(
      ()=>nonBuns[Math.floor(Math.random() * nonBuns.length)]._id
    );
  return {bunId: selectedBun, toppingIds: selectedToppings};
}


function App() {

  const [fetchState, setFetchState] = React.useState({
    loading: false,
    error: false,
    loaded: false
  });

  const [orderFetchState, setOrderFetchState] = React.useState({
    loading: false,
    error: false,
    loaded: false
  });  

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [order, setOrder] = React.useState<Order>({toppingIds: []});  

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  const [selectedIngredient, setSelectedIngredient] = React.useState<any>();

  const handleOpenOrderModal = function () {

    setOrderFetchState({loading: true, loaded: false, error: false}); 
    
    fetch(ORDER_API_URL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: [order.bunId, order.bunId, ...order.toppingIds]}) // one or two buns ???
    })
    .then(res=>res.json())
    .then(res=>{
      if (res.error) {
        throw new Error(res.error);
      }
      setOrder({...order, id: res.order.number});
      setOrderFetchState({loading: false, loaded: true, error: false});
    })
    .catch((err)=>{
      setOrderFetchState({loading: false, loaded: false, error: true});
    });

    setIsOrderModalOpen(true);
  }

  const handleOpenIngredientModal = function (ingredient: Ingredient) {
    setSelectedIngredient(ingredient);
    setIsIngredientModalOpen(true);
  }  

  const closeModals = function () {
    setIsOrderModalOpen(false);
    setIsIngredientModalOpen(false);
  }

  React.useEffect(()=>{
    setFetchState({loading: true, loaded: false, error: false});    

    fetch(INGREDIENTS_API_URL)
    .then(res=>res.json())
    .then(res=>{
      if (res.error) {
        throw new Error(res.error);
      }
      setIngredients(res.data);
      setFetchState({loading: false, loaded: true, error: false});
      setOrder(mockupOrder(res.data));
    })
    .catch((err)=>{
      setFetchState({loading: false, loaded: false, error: true});
    });

    const escapeHandler = (event:KeyboardEvent) => event.key === 'Escape' && closeModals();
    document.addEventListener('keydown', escapeHandler);

    return () => document.removeEventListener('keydown', escapeHandler);    
    

  },[]);


  return (
          <>
          
          <AppHeader />
         
          <main>
            <IngredientsContext.Provider value={{ingredients, setIngredients}}>
            <OrderContext.Provider value={{order, setOrder}}>
              {fetchState.loaded && (
                <>
              <BurgerIngredients handleIngredientClick={handleOpenIngredientModal} />
              <BurgerConstructor handleOrderClick={handleOpenOrderModal} />
                </>
              )}
              {fetchState.loading && (
                
                <h1 className="text text_type_main-large mt-10">Загрузка данных...</h1>
                
              )}            
              {fetchState.error && (
                <h1 className="text text_type_main-large mt-10">Произошла ошибка!</h1>
              )}              

              <Modal isOpen={isOrderModalOpen} closeCallback={closeModals}>    
                <OrderDetails orderFetchState={orderFetchState} />
              </Modal>
              <Modal isOpen={isIngredientModalOpen} closeCallback={closeModals} header={'Детали ингредиента'}>    
                  {selectedIngredient && (
                <IngredientDetails ingredient={selectedIngredient} />
                  )}            
              </Modal>    
              </OrderContext.Provider>
            </IngredientsContext.Provider>
          </main>
          </>
  );
}

export default App;
