import React from 'react';
import orderDetailsStyles from './OrderDetails.module.css';

function OrderDetails() {

    const [orderId, setOrderId] = React.useState('034536');
    const [orderStatus, setOrderStatus] = React.useState();

    return (
        <div className={orderDetailsStyles.container}>
            <h1 className={`text text_type_digits-large mb-8 ${orderDetailsStyles.orderId}`}>{orderId}</h1>
            <span className={`text text_type_main-medium mb-15`}>идентификатор заказа</span>
            <div className={`${orderDetailsStyles.orderGraphic} mb-15`}></div>
            <span className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
            <span className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}

export default OrderDetails;



