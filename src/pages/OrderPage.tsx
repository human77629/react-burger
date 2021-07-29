import React from 'react'
import styles from './OrderPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import {useSelector, useDispatch} from '../services/hooks'
import { getIngredients, WS_CONNECTION_START } from '../services/actions/burger'
import { useParams } from 'react-router-dom'
import { OrderDetails } from '../components/OrderDetails/OrderDetails'


export function OrderPage () {

    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(getIngredients())
        dispatch({type: WS_CONNECTION_START})
    },[])

    const {orders, ingredients} = useSelector(store=>store.burger)
    const {id} = useParams<{id:string}>()
    const order = orders.find(order=>order._id===id)
    
    

    return (
        <>
        <AppHeader />
        <main className={styles.container}>
            {order && (<OrderDetails order={order} ingredients={ingredients} />)}
        </main>
        </>
    )
}