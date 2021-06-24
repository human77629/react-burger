import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import burgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_TOPPING, ADD_TOPPING, SET_BUN } from "../../services/actions/burger";
import DraggableBurgerIngredient from "../DraggableBurgerIngredient/DraggableBurgerIngredient";



function BurgerConstructor (props) {


    const dispatch = useDispatch();

    const ingredients = useSelector( store => store.burger.ingredients )
    const order = useSelector(store=>store.burger.selectedIngredients)

    
    const onDropHandler = (itemId) => {
        const ingredient = ingredients.find(ingredient=>ingredient._id===itemId._id)
        dispatch({type: ingredient.type==='bun'?SET_BUN:ADD_TOPPING, id:ingredient._id});
    }

    const [{canDrop}, dropTarget] = useDrop({
        accept: 'newIngredient',
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
        })
    });

   

        const bun = ingredients.find(ingredient=>(order.bunId===ingredient._id));
        const toppings = order.toppingIds.map(componentId=>ingredients.find(ingredient=>ingredient._id===componentId));

        return (
        <section className={`${burgerConstructorStyles.container} pt-25` }>
            <ul className={`${burgerConstructorStyles.components} ml-4 mb-10`} ref={dropTarget}>
            
            <li className="pl-8">
            {bun && (
                <ConstructorElement type='top' isLocked={true} text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}/>
            )}
            </li>
            <div className={burgerConstructorStyles.componentsScrollable}>
            {toppings.map((component, k)=>component&&
                (
                    <DraggableBurgerIngredient key={k} component={component} index={k} handleClose={(e)=>{dispatch({type: REMOVE_TOPPING, index: k})}} />
                )
            )}
            </div>
            <li className="pl-8">
            {bun && (
                <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (низ)`} thumbnail={bun.image} price={bun.price}/>
            )}
            </li>
            {canDrop && (<div className={burgerConstructorStyles.dragHoverEffect}></div>)}
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