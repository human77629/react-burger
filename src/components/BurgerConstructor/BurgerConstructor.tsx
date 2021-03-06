import React from "react";

import { useDrop } from "react-dnd";
import {useSelector, useDispatch} from '../../services/hooks'


import burgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_TOPPING, ADD_TOPPING, SET_BUN } from "../../services/actions/burger";
import DraggableBurgerIngredient from "../DraggableBurgerIngredient/DraggableBurgerIngredient";


interface Props {
    handleOrderClick: () => void;
}

const BurgerConstructor:React.FC<Props> = (props:Props) => {


    const dispatch = useDispatch();

    const ingredients = useSelector( store => store.burger.ingredients )
    const order = useSelector( store=>store.burger.selectedIngredients )

    
    const onDropHandler = (itemId:{_id:string}) => {
        const ingredient = ingredients.find(ingredient=>ingredient._id===itemId._id)
        if (!ingredient) return;
        dispatch({type: ingredient.type==='bun'?SET_BUN:ADD_TOPPING, id:ingredient._id});
    }

    const [{canDrop}, dropTarget] = useDrop({
        accept: 'newIngredient',
        drop(itemId:{_id:string}) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
        })
    });

   

        const bun = React.useMemo(
            ()=>ingredients.find(ingredient=>(order.bunId===ingredient._id)), 
            [ingredients, order.bunId]);

        const toppings = React.useMemo(
            ()=>order.toppingIds.map(componentId=>ingredients.find(ingredient=>ingredient._id===componentId)), 
            [ingredients, order.toppingIds]);

        const isBurgerEmpty = !bun && toppings.length===0

        return (
        <section className={`${burgerConstructorStyles.container} pt-25` }>
            <ul className={`${burgerConstructorStyles.components} ml-4 mb-10`} ref={dropTarget}>
            {isBurgerEmpty && (
                <div className={burgerConstructorStyles.noIngredientsMessageContainer}>
                <h1 className="text text_type_main-medium mt-10">????????????????????, ???????????????????? ?????????????????????? ????????, ?????????? ?????????????? ????????????</h1>
                </div>
            )}
            <li className="pl-8">
            {bun && (
                <ConstructorElement type='top' isLocked={true} text={`${bun.name} (????????)`} thumbnail={bun.image} price={bun.price}/>
            )}
            </li>
            <div className={burgerConstructorStyles.componentsScrollable}>
            {!isBurgerEmpty && (toppings.length===0) && (
                <div className={burgerConstructorStyles.noIngredientsMessageContainer}>
                <h1 className="text text_type_main-medium mt-10">????????????????????, ???????????????????? ?????????????????????? ????????, ?????????? ?????????????? ????????????</h1>
                </div>
            )}                
            {toppings.map((component, k)=>component&&
                (
                    <DraggableBurgerIngredient key={k} component={component} index={k} handleClose={()=>{dispatch({type: REMOVE_TOPPING, index: k})}} />
                )
            )}
            </div>
            <li className="pl-8">
            {bun && (
                <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (??????)`} thumbnail={bun.image} price={bun.price}/>
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
                ???????????????? ??????????
            </Button>
            </div>
        </section>
    )
}


export default BurgerConstructor;