import React from "react";
import PropTypes from "prop-types";
import burgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsContext, OrderContext} from '../../services/burgerContext';



function BurgerConstructor (props) {

    const {ingredients} = React.useContext(IngredientsContext);
    const {order} = React.useContext(OrderContext);


        const bun = ingredients.find(ingredient=>(order.bunId===ingredient._id));
        const toppings = order.toppingIds.map(componentId=>ingredients.find(ingredient=>ingredient._id===componentId));

        return (
        <section className={`${burgerConstructorStyles.container} pt-25` }>
            <ul className={`${burgerConstructorStyles.components} ml-4 mb-10`}>
            <li className="pl-8">
            {bun && (
                <ConstructorElement type='top' isLocked={true} text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}/>
            )}
            </li>
            <div className={burgerConstructorStyles.componentsScrollable}>
            {toppings.map((component, k)=>component&&
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
            {bun && (
                <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (низ)`} thumbnail={bun.image} price={bun.price}/>
            )}
            </li>

            </ul>
            <div className={`${burgerConstructorStyles.priceInfo} mr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{[...toppings, bun, bun].reduce((s,v)=>(s+(v?v:{price:0}).price),0)}</p>
            <CurrencyIcon type='primary' />
            </div>
            <Button type='primary' size='medium' onClick={props.handleOrderClick}>
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}


BurgerConstructor.propTypes = {
    handleOrderClick: PropTypes.func.isRequired,
}

export default BurgerConstructor;