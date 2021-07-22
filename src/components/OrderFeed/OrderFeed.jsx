import React from 'react'
import styles from './OrderFeed.module.css'
import CardOrder from '../CardOrder/CardOrder'
import PropTypes from 'prop-types'


export function OrderFeed(props) {

    const {orders, ingredients} = props

    const compactOrderList = React.useMemo(()=>{
        if (orders && ingredients) {
            return orders.map(order=>{
                const uniqueIngredientIds = [...new Set(order.ingredients)]
                const uniqueIngredients = uniqueIngredientIds.map(uid=>ingredients.find(i=>i._id===uid))
                const bun = uniqueIngredients.find(ingredient=>ingredient.type==='bun')
                const toppings = uniqueIngredients.filter(ingredient=>ingredient.type!=='bun')
                const icons = [bun, ...toppings].slice(0,6).map(i=>({image: i.image}))
                const price = order.ingredients.reduce((a, v)=>a+ingredients.find(i=>i._id===v).price, 0)
                if (uniqueIngredients.length>6) icons[5].count = uniqueIngredients.length - 6
                return {
                    _id: order._id,
                    number: order.number, 
                    date: order.createdAt,
                    name: order.name,
                    status: props.status?order.status:null,
                    price: price,
                    icons: icons
                }
            })
        }
    }, [orders, ingredients])
    
    if (!orders || !ingredients) return;
    return (
            <ul className={`${styles.orders}`}>
                {compactOrderList.map(order=>
                    <CardOrder key={order._id} onClick={()=>{props.modalCallback(order._id)}} {...order} />
                )}
            </ul>     
    )
}

OrderFeed.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired).isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired).isRequired
}