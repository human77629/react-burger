import React from "react";
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {sampleData} from '../../utils/data.js'
import {sampleOrder} from '../../utils/order.js'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
class BurgerIngredients extends React.Component {


    

    state = {
        currentTab: 'bun',
        ingredientTypes: [
            {type: 'bun', title: 'Булки'},
            {type: 'sauce', title: 'Соусы'},
            {type: 'main', title: 'Начинки'}
        ]
    }

    tabs = () => (
        <div className={`${burgerIngredientsStyles.tabContainer} mt-6 mb-4`}>
        {this.state.ingredientTypes.map((ingredientType, k)=>(
        <Tab key={k} value={ingredientType.type} active={this.state.currentTab === ingredientType.type} onClick={this.setTab}>
        {ingredientType.title}
        </Tab>
        ))}
    </div>
    )


    setTab=(val: string)=> {
        this.setState(prevState=>({...prevState, currentTab: val}));
    }

    render=()=> (
        <section className={`${burgerIngredientsStyles.container} ml-5 mr-5`}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            {this.tabs()}
            <ul className={burgerIngredientsStyles.ingredients}>
                {this.state.ingredientTypes
                .map((ingredientType,k_type)=>(
                    <>
                    <h1 key={k_type} className="text text_type_main-medium mt-6 mb-2">{ingredientType.title}</h1>
                    <ul className={burgerIngredientsStyles.ingredientsContainer}>
                    {sampleData.filter(ingredient=>(ingredient.type===ingredientType.type)).map((ingredient,k)=>(
                        <BurgerIngredient key={`${k_type}.${k}`} ingredient={{...ingredient, count: sampleOrder.filter(o=>ingredient._id===o).length}} />
                    ))}
                    </ul>
                    </>
                ))}
                

            </ul>
        </section>
    )
}

export default BurgerIngredients;