import React from "react";
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";

interface Props {
    ingredients: {
        image: string,
        price: number,
        name: string,
        _id: string,
        type: string
    }[],
    selectedIngredients: string[]
}

function BurgerIngredients (props:Props) {

    const [currentTab, setCurrentTab] = React.useState('bun');
    const ingredientTypes =
        [
            {type: 'bun', title: 'Булки'},
            {type: 'sauce', title: 'Соусы'},
            {type: 'main', title: 'Начинки'}
        ]
    


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
                    {props.ingredients.filter(ingredient=>(ingredient.type===ingredientType.type)).map((ingredient,k)=>(
                        <BurgerIngredient key={k} ingredient={{...ingredient, count: props.selectedIngredients.filter(o=>ingredient._id===o).length}} />
                    ))}
                    </ul>
                    </React.Fragment>
                ))}
                

            </ul>
        </section>
    )
}

/*
interface Props {
    ingredients: {
        image: string,
        price: number,
        name: string,
        _id: string,
        type: string
    }[]
}
*/

const ingredientPropTypes = PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
})

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    selectedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default BurgerIngredients;