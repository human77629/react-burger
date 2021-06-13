import React from 'react';
import orderDetailsStyles from './OrderDetails.module.css';
import {OrderContext} from '../../services/burgerContext';

interface Props {
    orderFetchState: {
        loading: boolean,
        loaded: boolean,
        error: boolean
    }
}

function OrderDetails(props: Props) {

    const {order} = React.useContext(OrderContext);
    
    return (
        <div className={orderDetailsStyles.container}>
            {props.orderFetchState.loaded && (
                <>
            <h1 className={`text text_type_digits-large mb-8 ${orderDetailsStyles.orderId}`}>{order.id}</h1>
            <span className={`text text_type_main-medium mb-15`}>идентификатор заказа</span>
            <div className={`${orderDetailsStyles.orderGraphic} mb-15`}></div>
            <span className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</span>
            <span className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</span>
                </>
            )}
            {props.orderFetchState.loading && (
                <>
            <span className={`text text_type_main-medium mb-30`}>Отправка данных о заказе...</span>
                </>
            )}            

            {props.orderFetchState.error && (
                <>
            <span className={`text text_type_main-medium mb-30`}>Произошла ошибка!</span>
                </>
            )}                

        </div>
    )
}


export default OrderDetails;



