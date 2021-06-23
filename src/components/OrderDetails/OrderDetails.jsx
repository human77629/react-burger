import React from 'react';
import orderDetailsStyles from './OrderDetails.module.css';
import {useSelector} from 'react-redux';

function OrderDetails() {

    const order = useSelector(store=>store.burger.order)
    const orderRequest = useSelector(store=>store.burger.orderRequest)
    const orderFailed = useSelector(store=>store.burger.orderFailed)
    
    return (
        <div className={orderDetailsStyles.container}>
            {!orderRequest && !orderFailed && (
                <>
            <h1 className={`text text_type_digits-large mb-8 ${orderDetailsStyles.orderId}`}>{order.number}</h1>
            <span className={`text text_type_main-medium mb-15`}>идентификатор заказа</span>
            <div className={`${orderDetailsStyles.orderGraphic} mb-15`}></div>
            <span className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
            <span className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</span>
                </>
            )}
            {orderRequest && (
                <>
            <span className={`text text_type_main-medium mb-30`}>Отправка данных о заказе...</span>
                </>
            )}            

            {orderFailed && (
                <>
            <span className={`text text_type_main-medium mb-30`}>Произошла ошибка!</span>
                </>
            )}                

        </div>
    )
}


export default OrderDetails;



