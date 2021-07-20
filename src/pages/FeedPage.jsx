import React from 'react'
import styles from './FeedPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, getIngredients } from '../services/actions/burger'
import { useHistory, useLocation } from 'react-router-dom'
import { OrderDetails } from '../components/OrderDetails/OrderDetails'
import { VIEW_ORDER } from '../services/actions/burger'
import Modal from '../components/Modal/Modal.jsx';
import { OrderFeed } from '../components/OrderFeed/OrderFeed'


export function FeedPage() {

    React.useEffect(()=>{
        dispatch(getIngredients())
        dispatch(getOrders())
        const escapeHandler = (event) => event.key === 'Escape' && handleCloseModals();
        document.addEventListener('keydown', escapeHandler);
    
        return () => document.removeEventListener('keydown', escapeHandler);          
    },[])
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const {orders, ingredients, viewedOrder} = useSelector(store=>store.burger)
    const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false)
    

    const handleOpenOrderModal = function (orderId) {
        const order = orders.find(order=>order._id===orderId)
        history.replace({pathname: `/feed/${order._id}`, state: {background: location}})
        dispatch({type: VIEW_ORDER, order: order});
        setIsOrderModalOpen(true);        
    }

    const handleCloseModals = () => {
        setIsOrderModalOpen(false)
        history.replace({pathname: '/feed'})
    }
   
    if (!orders || !ingredients) return <AppHeader/>;
    return (<>
    <AppHeader/>
    <Modal isOpen={isOrderModalOpen} closeCallback={handleCloseModals} header={'Детали заказа'}>
        {viewedOrder && (
            <OrderDetails order={viewedOrder} ingredients={ingredients} />
        )}
    </Modal>
    <main className={styles.container}>
        <header className={styles.header}>
            <h1 className={`${styles.headerText} text text_type_main-large mt-10 mb-10`}>Лента заказов</h1>
        </header>
        <section className={`${styles.content}`}>
            <OrderFeed orders={orders} ingredients={ingredients} modalCallback={handleOpenOrderModal} status/>
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