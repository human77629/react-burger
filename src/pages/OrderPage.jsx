import React from 'react'
import styles from './OrderPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import {useSelector, useDispatch} from 'react-redux'
import { getOrders, getIngredients } from '../services/actions/burger'
import { useParams } from 'react-router-dom'
import { OrderDetails } from '../components/OrderDetails/OrderDetails'


export function OrderPage () {

    React.useEffect(()=>{
        dispatch(getIngredients())
        dispatch(getOrders())
    },[])
    const dispatch = useDispatch()
    const {orders, ingredients} = useSelector(store=>store.burger)
    const {id} = useParams()
    
    const order = orders.find(order=>order._id===id)

    return (
        <>
        <AppHeader />
        <main className={styles.container}>
            <OrderDetails order={order} ingredients={ingredients} />
        </main>
        </>
    )
}