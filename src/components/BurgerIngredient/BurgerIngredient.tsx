import React from 'react';
import PropTypes from 'prop-types';
import ingredientStyles from './BurgerIngredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


interface Props {
    ingredient: {
        image: string,
        price: number,
        name: string,
        count: number
    }
}

function BurgerIngredient (props: Props) {
    return (
        

        <li className={`${ingredientStyles.container} mt-4 mb-4 ml-4 mr-2`}>
            <img alt={props.ingredient.name} src={props.ingredient.image} className={`${ingredientStyles.illustration} mr-4 ml-4`} />
            <span className={`${ingredientStyles.price} mb-1 mt-1`}>
                <p className="text text_type_digits-default mr-2">
                    {props.ingredient.price}
                </p>
                <CurrencyIcon type='primary'/>
            </span>
            <p className={`${ingredientStyles.name} text text_type_main-default`}>
                {props.ingredient.name}
            </p>
            
            {(props.ingredient.count>0) && (
                <Counter count={props.ingredient.count} />
            )}
        </li>

    )
}

const ingredientPropTypes = PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
});

BurgerIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired
}

export default BurgerIngredient;