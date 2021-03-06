import React from 'react'
import styles from './OrderDetails.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientIcon from '../IngredientIcon/IngredientIcon'
import { TIngredient, TOrder } from '../../services/types'



type TIngredientListItem = {
    _id: string,
    image: string,
    name: string,
    price: number,
    count?: number,
    image_mobile?:string,
}

interface Props {
    ingredients: TIngredient[],
    order: TOrder,
}



const ingredientListItem = function (ingredient:TIngredientListItem) {

    return (
        <li key={ingredient._id} className={styles.ingredient}>
            {ingredient.image && <IngredientIcon image={ingredient.image} />}
            <span className={`${styles.ingredientName} text text_type_main-default pl-4 pr-4`}>{ingredient.name}</span>
            <div className={styles.price}>
                <span className="text text_type_digits-default">{ingredient.count} x {ingredient.price}&nbsp;</span>
                <CurrencyIcon type='primary' />
            </div>
        </li>
        )
}

export const OrderDetails:React.FC<Props> = (props:Props) => {

    const {ingredients, order} = props

    order.ingredients = order.ingredients.filter(i=>i!==null)
   

    const ingredientList = React.useMemo(()=>{
        if (!order || !ingredients) return;
        const ingredientIds = order.ingredients
        const uniqueIngredientIds = [...new Set(ingredientIds)]
        
        return uniqueIngredientIds.map(uid=>{
            const ingredient = ingredients.find(i=>i._id===uid)
            if (!ingredient) return;
            return {_id: ingredient._id, image: ingredient.image_mobile||'', name: ingredient.name, price: ingredient.price, count: ingredientIds.filter(id=>id===uid).length}
        });
        
        
    },
        [order, ingredients]);  


        const price = React.useMemo(()=>{
            if (!order || !order.ingredients || !ingredients) return 0;
            return order.ingredients.reduce((a, v)=>a+(ingredients.find(i=>i._id===v)?.price||0), 0)
        },[order, ingredients])
        
    const timeText = React.useMemo(()=>{
        if (order) {
            const today = new Date();
            const orderDate = new Date(order.createdAt);
            const difference = today.getDate() - orderDate.getDate()
            const timezone = orderDate.toString().split(' ')[5];
            const time = orderDate.toString().split(' ')[4];
            let days = '????????';
            if (difference%10<5) days= '??????'
            if (difference%10===1) days= '????????'
            let date = `${difference} ${days} ??????????`
            if (difference===1) date='??????????'
            if (difference===0) date='??????????????'
            
            return `${date}, ${time} ${timezone}`
        }
    }, [order])
    
    return (
        <>
        {ingredients && order && (
        <div className={`${styles.container} m-10`}>
            <p className={`${styles.orderNo} text text_type_digits-default mb-10`}>#{order.number}</p>
            <h1 className={`${styles.header} text text_type_main-medium mb-3`}>{order.name}</h1>
            <p className={`${styles.orderStatus} ${order.status==='done'?styles.completed:''} text text_type_main-default mb-15`}>{order.status==='done'?'????????????????':'??????????????????'}</p>
            <h1 className={`${styles.header} text text_type_main-medium mb-6`}>????????????:</h1>
            <ul className={`${styles.ingredients} mb-10`}>
                {ingredientList?.map(ingredient=>ingredient && ingredientListItem(ingredient))}
            </ul>
            <p className={styles.footer}>
                <span className={`text text_type_main-default text_color_inactive`}>{timeText}</span>
                <span className={styles.price}>
                <span className="text text_type_digits-default">{price}&nbsp;</span>
                <CurrencyIcon type='primary' />
            </span>
            </p>
        </div>
        )}
        </>
    )
}
