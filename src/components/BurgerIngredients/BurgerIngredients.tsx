import React from "react";
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {sampleData} from '../../utils/data.js'
import {sampleOrder} from '../../utils/order.js'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
function BurgerIngredients () {

    const [currentTab, setCurrentTab] = React.useState('bun');
    const [ingredientTypes, setIngredientTypes] = React.useState(
        [
            {type: 'bun', title: 'Булки'},
            {type: 'sauce', title: 'Соусы'},
            {type: 'main', title: 'Начинки'}
        ]
    )


    const tabs = () => (
        <div className={`${burgerIngredientsStyles.tabContainer} mt-6 mb-4`}>
        {ingredientTypes.map((ingredientType, k)=>(
        <Tab key={k} value={ingredientType.type} active={currentTab === ingredientType.type} onClick={setCurrentTab}>
        {ingredientType.title}
        </Tab>
        ))}
    </div>
    )



    return (
        <section className={`${burgerIngredientsStyles.container} ml-5 mr-5`}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            {tabs()}
            <ul className={burgerIngredientsStyles.ingredients}>
                {ingredientTypes
                .map((ingredientType,componentTypeKey)=>(
                    <React.Fragment key={componentTypeKey}>
                    <h1 className="text text_type_main-medium mt-6 mb-2">{ingredientType.title}</h1>
                    <ul className={burgerIngredientsStyles.ingredientsContainer}>
                    {sampleData.filter(ingredient=>(ingredient.type===ingredientType.type)).map((ingredient,k)=>(
                        <BurgerIngredient key={k} ingredient={{...ingredient, count: sampleOrder.filter(o=>ingredient._id===o).length}} />
                    ))}
                    </ul>
                    </React.Fragment>
                ))}
                

            </ul>
        </section>
    )
}

export default BurgerIngredients;