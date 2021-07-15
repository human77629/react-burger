import React from 'react'
import styles from './FeedPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, getIngredients } from '../services/actions/burger'
import { useParams } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientIcon from '../components/IngredientIcon/IngredientIcon'
import CardOrder from '../components/CardOrder/CardOrder'


export function FeedPage() {

    React.useEffect(()=>{
        dispatch(getIngredients())
        dispatch(getOrders())
    },[])
    const dispatch = useDispatch()
    const {orders, ingredients} = useSelector(store=>store.burger)
    const {id} = useParams()

    const compactOrderList = React.useMemo(()=>{
        if (orders && ingredients) {
            return orders.map(order=>{
                const uniqueIngredientIds = [...new Set(order.ingredients)]
                const uniqueIngredients = uniqueIngredientIds.map(uid=>ingredients.find(i=>i._id===uid))
                const bun = uniqueIngredients.find(ingredient=>ingredient.type==='bun')
                const toppings = uniqueIngredients.filter(ingredient=>ingredient.type!=='bun')
                const icons = [bun, ...toppings].slice(0,6).map(i=>({image: i.image}))
                if (uniqueIngredients.length>6) icons[5].count = uniqueIngredients.length - 6
                console.log({
                    number: order.number, 
                    date: order.createdAt,
                    name: order.name,
                    price: order.price,
                    icons: icons
                });
                return {
                    _id: order._id,
                    number: order.number, 
                    date: order.createdAt,
                    name: order.name,
                    price: order.price,
                    icons: icons
                }
            })
        }
    }, [orders, ingredients])
    
    if (!orders || !ingredients) return <AppHeader/>;
    return (<>
    <AppHeader/>
    
    <main class={styles.container}>
        <header class={styles.header}>
            <h1 className={`${styles.headerText} text text_type_main-large mt-10 mb-10`}>Лента заказов</h1>
        </header>
        <section className={`${styles.content}`}>
            <section className={`${styles.orders}`}>
                {compactOrderList.map(order=>
                    <CardOrder key={order._id} {...order} />
                )}
            </section>
            <section className={`${styles.stats}`}>
                <section className={`${styles.orderBoard} mb-15`}>
                    <ul className={`${styles.completedOrders}`}>
                        <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
                        {orders.filter(order=>order.status==='done').map(order=>(
                            <span key={order._id} className={`${styles.complete} text text_type_digits-default`}>{order.number}</span>
                        ))}
                    </ul>
                    <ul className={`${styles.pendingOrders}`}>
                        <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
                        {orders.filter(order=>order.status!=='done').map(order=>(
                            <span key={order._id} className={`text text_type_digits-default`}>{order.number}</span>
                        ))}
                    </ul>
                </section>
                <section className={`${styles.allTimeTotal} mb-15`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Выполнено за все время:</h2>
                    <span className={`${styles.giantGlowingDigits} text text_type_digits-large`}>28 752</span>
                </section>
                <section className={`${styles.todayTotal}`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Выполнено за сегодня:</h2>
                    <span className={`${styles.giantGlowingDigits} text text_type_digits-large`}>138</span>
                </section>
            </section>      
        </section>  
    </main>
    </>)
}