import React from 'react'
import styles from './FeedPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useSelector, useDispatch } from '../services/hooks'
import { getIngredients, WS_CONNECTION_START } from '../services/actions/burger'
import { useHistory, useLocation } from 'react-router-dom'
import { OrderDetails } from '../components/OrderDetails/OrderDetails'
import { VIEW_ORDER } from '../services/actions/burger'
import Modal from '../components/Modal/Modal';
import { OrderFeed } from '../components/OrderFeed/OrderFeed'


export function FeedPage() {


    const ORDER_LIST_HEIGHT = 8
    const ORDER_LIST_WIDTH = 20

    const fillOrderList = (orderNumbers:string[]) => {
        let maxLength = 0
        let displayOrderCount = orderNumbers.length
        for (let i=0; i<orderNumbers.length; i++) {
            const orderNo = orderNumbers[i]
            maxLength = orderNo.length>maxLength?orderNo.length:maxLength

            const cols = Math.floor((ORDER_LIST_WIDTH+1)/(maxLength+1))
            const maxOrders = cols*ORDER_LIST_HEIGHT
            if (maxOrders<i) break;
            displayOrderCount = i
        }
        return orderNumbers.slice(0, displayOrderCount)
    }




    React.useEffect(()=>{
        dispatch(getIngredients())
        //dispatch(getOrders())
        dispatch({type: WS_CONNECTION_START})      
    },[])
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {orders, ingredients, viewedOrder, totalOrderCount, todayOrderCount} = useSelector(store=>store.burger)

    const finishedOrders = React.useMemo(()=>
        fillOrderList(orders.filter(order=>order.status==='done').map(order=>order.number.toString()))
    ,[orders])    
    const pendingOrders = React.useMemo(()=>
        fillOrderList(orders.filter(order=>order.status!=='done').map(order=>order.number.toString()))
    ,[orders])    
    

    const handleOpenOrderModal = function (orderId:string) {
        const order = orders.find(order=>order._id===orderId)
        history.replace({pathname: `/feed/${order?._id}`, state: {background: location, modalHeader: 'Детали заказа'}})
        dispatch({type: VIEW_ORDER, order: order});
    }

   
    if (!orders || !ingredients) return <></>;
    return (
    <main className={styles.container}>
        <header className={styles.header}>
            <h1 className={`${styles.headerText} text text_type_main-large mt-10 mb-10`}>Лента заказов</h1>
        </header>
        <section className={`${styles.content}`}>
            <OrderFeed orders={orders} ingredients={ingredients} modalCallback={handleOpenOrderModal} status/>
            <section className={`${styles.stats}`}>
                <section className={`${styles.orderBoard} mb-15`}>
                    <section className={`${styles.boardBlock}`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
                    <ul className={`${styles.completedOrders}`}>
                        
                        {finishedOrders.map(order=>(
                            <span key={order} className={`${styles.complete} text text_type_digits-default`}>{order}</span>
                        ))}
                    </ul>
                    </section>
                    <section className={`${styles.boardBlock}`}>
                    <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
                    <ul className={`${styles.pendingOrders}`}>
                        {pendingOrders.map(order=>(
                            <span key={order} className={`text text_type_digits-default`}>{order}</span>
                        ))}
                    </ul>
                    </section>
                </section>
                <section className={`${styles.allTimeTotal} mb-15`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Выполнено за все время:</h2>
                    <span className={`${styles.giantGlowingDigits} text text_type_digits-large`}>{totalOrderCount}</span>
                </section>
                <section className={`${styles.todayTotal}`}>
                    <h2 className={`text text_type_main-medium mb-6`}>Выполнено за сегодня:</h2>
                    <span className={`${styles.giantGlowingDigits} text text_type_digits-large`}>{todayOrderCount}</span>
                </section>
            </section>      
        </section>  
    </main>
    )
}