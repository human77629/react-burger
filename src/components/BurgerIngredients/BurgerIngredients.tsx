import React from "react";
import burgerIngredientsStyles from './BurgerIngredients.module.css'
class BurgerIngredients extends React.Component {

    render=()=> (
        <section className={burgerIngredientsStyles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
        </section>
    )
}

export default BurgerIngredients;