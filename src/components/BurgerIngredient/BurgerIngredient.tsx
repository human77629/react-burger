
import { useDrag } from "react-dnd";

import ingredientStyles from './BurgerIngredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {TIngredient} from '../../services/types'


type TIngredientWithCount = TIngredient & {count: number}


interface Props {
    ingredient: TIngredientWithCount,
    onClick: (ingredient:TIngredient)=>void,
}

const BurgerIngredient:React.FC<Props> = (props:Props) => {
    const _id = props.ingredient._id;
    const [, dragRef] = useDrag({
        type: 'newIngredient',
        item: {_id}
    });
    return (

        <li ref={dragRef} className={`${ingredientStyles.container} mt-4 mb-4 ml-4 mr-2`} onClick={()=>props.onClick(props.ingredient)}>

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

export default BurgerIngredient;