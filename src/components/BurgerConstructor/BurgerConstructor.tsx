import React from "react";
import burgerConstructorStyles from './BurgerConstructor.module.css'
import {sampleData} from '../../utils/data.js'
import {sampleOrder} from '../../utils/order.js'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component {

    render=()=> {
        let bunComponentId = sampleOrder.find(component=>(sampleData.find(ingredient=>(ingredient._id===component)&&ingredient.type==='bun')));
        let bunComponent = sampleData.find(ingredient=>(bunComponentId===ingredient._id));
        let nonBunComponentIds = sampleOrder.filter(component=>(sampleData.find(ingredient=>(ingredient._id===component)&&!(ingredient.type==='bun'))));
        let nonBunComponents = nonBunComponentIds.map(componentId=>sampleData.find(ingredient=>ingredient._id===componentId));

        return (
        <section className={`${burgerConstructorStyles.container} pt-25` }>
            <ul className={`${burgerConstructorStyles.components} ml-4 pr-4 mb-10`}>
            <li className="pl-8">
            {bunComponent && (
                <ConstructorElement type='top' isLocked={true} text={`${bunComponent.name} (верх)`} thumbnail={bunComponent.image} price={bunComponent.price}/>
            )}
            </li>

            {nonBunComponents.map(component=>component&&
                (
                <li className={`${burgerConstructorStyles.component} pl-8`}>
                    <div className={burgerConstructorStyles.dragIcon}>
                    <DragIcon type='primary' />
                    </div>
                    <div className={burgerConstructorStyles.ingredientFix}>
                    <ConstructorElement text={component.name} thumbnail={component.image} price={component.price}/>
                    </div>
                </li>
                )
            )}

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
    )}
}

export default BurgerConstructor;