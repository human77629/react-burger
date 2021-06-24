import React from "react";
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient.jsx";



function BurgerIngredients (props) {

    const order = useSelector(store=> store.burger.selectedIngredients)
    const ingredients = useSelector( store => store.burger.ingredients )

    const selectedIngredients = [order.bunId, ...order.toppingIds];

    const [currentTab, setCurrentTab] = React.useState('bun');
    const selectTab = (t) => {
        setCurrentTab(t);
        const ref = ingredientTypes.find(type=>type.type===t)?.labelRef;
        if (ref) ref.current?.scrollIntoView();
    }

    const scrollHandler = (e) => {
        const container = e.target;
        const containerPadding = 24; // наверное лучше вообще без этого (игнорировать паддинг), чем хардкодом?

        const weightedCategories = ingredientTypes.map(category=> {
            const relativeLabelOffset = category.labelRef.current.offsetTop - container.offsetTop - containerPadding;
            const resultingLabelDistance = Math.abs(relativeLabelOffset - container.scrollTop);
            return {category: category, weight: resultingLabelDistance}
        })
        
        const closestCategory = weightedCategories.reduce((a,v)=>v.weight<a.weight?v:a,weightedCategories[0]).category;

        setCurrentTab(closestCategory.type);
    }

    const ingredientTypes =
        [
            {type: 'bun', title: 'Булки', labelRef: React.useRef(null)},
            {type: 'sauce', title: 'Соусы', labelRef: React.useRef(null)},
            {type: 'main', title: 'Начинки', labelRef: React.useRef(null)}
        ]

    const tabs = () => (
        <div className={`${burgerIngredientsStyles.tabContainer} mt-6 mb-4`}>
        {ingredientTypes.map((ingredientType, k)=>(
        <Tab key={k} value={ingredientType.type} active={currentTab === ingredientType.type} onClick={selectTab}>
        {ingredientType.title}
        </Tab>
        ))}
    </div>
    )



    return (
        <section className={`${burgerIngredientsStyles.container} ml-5 mr-5`}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            {tabs()}
            <ul className={burgerIngredientsStyles.ingredients} onScroll={scrollHandler}>
                {ingredientTypes
                .map((ingredientType,componentTypeKey)=>(
                    <React.Fragment key={componentTypeKey}>
                    <h1 className="text text_type_main-medium mt-6 mb-2" ref={ingredientType.labelRef}>{ingredientType.title}</h1>
                    <ul className={burgerIngredientsStyles.ingredientsContainer}>
                    {ingredients.filter(ingredient=>(ingredient.type===ingredientType.type)).map((ingredient)=>(
                        <BurgerIngredient onClick={props.handleIngredientClick} key={ingredient._id} ingredient={{...ingredient, count: selectedIngredients.filter(o=>ingredient._id===o).length}} />
                    ))}
                    </ul>
                    </React.Fragment>
                ))}
                

            </ul>
        </section>
    )
}


BurgerIngredients.propTypes = {
    handleIngredientClick: PropTypes.func.isRequired,
}

export default BurgerIngredients;