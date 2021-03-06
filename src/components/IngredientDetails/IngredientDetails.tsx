import React from "react";

import ingredientDetailsStyles from './IngredientDetails.module.css';
import {TIngredient} from '../../services/types'


interface Props {
    ingredient: TIngredient
}


function NutritionValue(props:{label:string, value:number}) {
    return (
        <li className={ingredientDetailsStyles.nutritionValue}>
            <span className='text text_type_main-default text_color_inactive'>{props.label}</span>
            <span className='text text_type_digits-default text_color_inactive'>{props.value.toFixed(1).replace('.',',')}</span>
        </li>
    )
}


const IngredientDetails:React.FC<Props> = (props:Props) => {
    return (
        <div className={ingredientDetailsStyles.container}>

            <img className={`${ingredientDetailsStyles.image} mb-4`} alt={props.ingredient.name} src={props.ingredient.image_large} />

        <span className='text text_type_main-medium mb-8'>{props.ingredient.name}</span>
        <ul className={`${ingredientDetailsStyles.nutritionValues} mb-15`}>
            <NutritionValue label='Калории, ккал' value={props.ingredient.calories/10} />
            <NutritionValue label='Белки, г' value={props.ingredient.proteins/10} />
            <NutritionValue label='Жиры, г' value={props.ingredient.fat/10} />
            <NutritionValue label='Углеводы, г' value={props.ingredient.carbohydrates/10} />

        </ul>
        </div>
    );
}


export default IngredientDetails;