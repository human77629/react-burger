import React from 'react';
import ingredientStyles from './BurgerIngredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

interface Props {
    key: string,
    ingredient: {
        image: string,
        price: number,
        name: string,
        count: number
    }
}

class BurgerIngredient extends React.Component<Props> {
    render=() => (
        

        <li key={this.props.key} className={`${ingredientStyles.container} mt-4 mb-4 ml-4 mr-2`}>
            <img src={this.props.ingredient.image} className={`${ingredientStyles.illustration} mr-4 ml-4`} />
            <span className={`${ingredientStyles.price} mb-1 mt-1`}>
                <p className="text text_type_digits-default mr-2">
                    {this.props.ingredient.price}
                </p>
                <CurrencyIcon type='primary'/>
            </span>
            <p className={`${ingredientStyles.name} text text_type_main-default`}>
                {this.props.ingredient.name}
            </p>
            
            {(this.props.ingredient.count>0) && (
                <Counter count={this.props.ingredient.count} />
            )}
        </li>

    )
}

export default BurgerIngredient;