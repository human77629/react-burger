import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal';
import './App.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';


interface Ingredient {

      image: string,
      price: number,
      name: string,
      _id: string,
      type: string

}

const mockupOrder = (ingredients:Ingredient[]) => {
  const buns = ingredients.filter(ingredient=>(ingredient.type==='bun'));
  const nonBuns = ingredients.filter(ingredient=>!(ingredient.type==='bun'));
  const selectedBun = buns[Math.floor(Math.random() * buns.length)]._id;
  const selectedNonBuns = [1,2,3,4,5,6,7,8,9,10].map(
      ()=>nonBuns[Math.floor(Math.random() * nonBuns.length)]._id
    );
  return [selectedBun, ...selectedNonBuns];
}


function App() {

  const [fetchState, setFetchState] = React.useState({
    loading: false,
    error: false,
    loaded: false
  });

  const [ingredients, setIngredients] = React.useState([]);
  const [order, setOrder] = React.useState<string[]>([]);  

  const [isIngredientModalOpen, setIsIngredientModalOpen] = React.useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false);

  const [selectedIngredient, setSelectedIngredient] = React.useState<any>();

  const handleOpenOrderModal = function () {
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
            {fetchState.loaded && (
              <>
            <BurgerIngredients ingredients={ingredients} selectedIngredients={order} handleIngredientClick={handleOpenIngredientModal} />
            <BurgerConstructor ingredients={ingredients} selectedIngredients={order} handleOrderClick={handleOpenOrderModal} />
              </>
            )}
            {fetchState.loading && (
              
              <h1 className="text text_type_main-large mt-10">Загрузка данных...</h1>
              
            )}            
            {fetchState.error && (
              <h1 className="text text_type_main-large mt-10">Произошла ошибка!</h1>
            )}              

            <Modal isOpen={isOrderModalOpen} closeCallback={closeModals}>    
              <OrderDetails />
            </Modal>
            <Modal isOpen={isIngredientModalOpen} closeCallback={closeModals} header={'Детали ингредиента'}>    
              
              
                {selectedIngredient && (
              <IngredientDetails ingredient={selectedIngredient} />
                )}
              
            </Modal>            
          </main>
          </>
  );
}

export default App;
