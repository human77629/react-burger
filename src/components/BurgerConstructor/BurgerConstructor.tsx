import React from "react";
import PropTypes from "prop-types";
import burgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

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

function BurgerConstructor (props: Props) {


        const bunComponentId = props.selectedIngredients.find(component=>(props.ingredients.find(ingredient=>(ingredient._id===component)&&ingredient.type==='bun')));
        const bunComponent = props.ingredients.find(ingredient=>(bunComponentId===ingredient._id));
        const nonBunComponentIds = props.selectedIngredients.filter(component=>(props.ingredients.find(ingredient=>(ingredient._id===component)&&!(ingredient.type==='bun'))));
        const nonBunComponents = nonBunComponentIds.map(componentId=>props.ingredients.find(ingredient=>ingredient._id===componentId));

        return (
        <section className={`${burgerConstructorStyles.container} pt-25` }>
            <ul className={`${burgerConstructorStyles.components} ml-4 mb-10`}>
            <li className="pl-8">
            {bunComponent && (
                <ConstructorElement type='top' isLocked={true} text={`${bunComponent.name} (верх)`} thumbnail={bunComponent.image} price={bunComponent.price}/>
            )}
            </li>
            <div className={burgerConstructorStyles.componentsScrollable}>
            {nonBunComponents.map((component, k)=>component&&
                (
                <li key={k} className={`${burgerConstructorStyles.component} pl-8`}>
                    <div className={burgerConstructorStyles.dragIcon}>
                    <DragIcon type='primary' />
                    </div>
                    <div className={burgerConstructorStyles.ingredientFix}>
                    <ConstructorElement text={component.name} thumbnail={component.image} price={component.price}/>
                    </div>
                </li>
                )
            )}
            </div>
            <li className="pl-8">
            {bunComponent && (
                <ConstructorElement type='bottom' isLocked={true} text={`${bunComponent.name} (низ)`} thumbnail={bunComponent.image} price={bunComponent.price}/>
            )}
            </li>

            </ul>
            <div className={`${burgerConstructorStyles.priceInfo} mr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{[...nonBunComponents, bunComponent].reduce((s,v)=>(s+(v?v:{price:0}).price),0)}</p>
            <CurrencyIcon type='primary' />
            </div>
            <Button type='primary' size='medium'>
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}

const ingredientPropTypes = PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
})

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    selectedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default BurgerConstructor;