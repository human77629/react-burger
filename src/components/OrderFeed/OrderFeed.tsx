import React from 'react'
import styles from './OrderFeed.module.css'
import CardOrder from '../CardOrder/CardOrder'
import { TIngredient, TOrder } from '../../services/types'


interface Props {
    orders: TOrder[],
    ingredients: TIngredient[],
    status?:boolean,    
    modalCallback: (id:string) => void,
}



export const OrderFeed:React.FC<Props> = (props:Props) => {

    const {orders, ingredients} = props


    
    const compactOrderList = React.useMemo(()=>{
        if (orders && ingredients) {
            return orders.map(order=>{
                order.ingredients = order.ingredients.filter(i=>i!==null)
                const uniqueIngredientIds = [...new Set(order.ingredients)]
                const uniqueIngredients = uniqueIngredientIds.map(uid=>ingredients.find(i=>i._id===uid))
                if (!uniqueIngredients) return;
                const bun = uniqueIngredients.find(ingredient=>ingredient?.type==='bun')
                const toppings = uniqueIngredients.filter(ingredient=>ingredient?.type!=='bun')
                const burger = bun?[bun, ...toppings]:toppings
                const icons:{image:string, count?:number}[] = burger.slice(0,6).map(i=>({image: i?.image||''}))
                const price = order.ingredients.reduce((a, v)=>a+(ingredients.find(i=>i._id===v)?.price||0), 0)
                if (uniqueIngredients.length>6) icons[5].count = uniqueIngredients.length - 6
                return {
                    _id: order._id,
                    number: order.number, 
                    date: order.createdAt,
                    name: order.name,
                    status: props.status?order.status:undefined,
                    price: price,
                    icons: icons
                }
            })
        }
    }, [orders, ingredients])

    
    if (!orders || !ingredients) return <></>;
    return (
            <ul className={`${styles.orders}`}>
                {compactOrderList && compactOrderList.map((order,i)=> (<React.Fragment key={i}>
                    {order && (<CardOrder onClick={()=>{props.modalCallback(order?._id||'')}} {...order} />)}
                    </React.Fragment>)
                )}
            </ul>     
    )
}

