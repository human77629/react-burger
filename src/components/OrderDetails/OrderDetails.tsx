import React from 'react';
import orderDetailsStyles from './OrderDetails.module.css';
import {OrderContext} from '../../services/burgerContext';

function OrderDetails() {

    const {order, setOrder} = React.useContext(OrderContext);
    React.useEffect(()=>{setOrder({...order, id: '000000'})},[]);
    
    return (
        <div className={orderDetailsStyles.container}>
            <h1 className={`text text_type_digits-large mb-8 ${orderDetailsStyles.orderId}`}>{order.id}</h1>
            <span className={`text text_type_main-medium mb-15`}>идентификатор заказа</span>
            <div className={`${orderDetailsStyles.orderGraphic} mb-15`}></div>
            <span className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
            <span className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}


export default OrderDetails;



