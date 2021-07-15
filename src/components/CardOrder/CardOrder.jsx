import React from 'react';
import PropTypes from 'prop-types';
import IngredientIcon from '../IngredientIcon/IngredientIcon';
import styles from './CardOrder.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useHistory} from 'react-router-dom'

function CardOrder (props) {
    const history = useHistory();

    const timeText = React.useMemo(()=>{
        if (props.date) {

            const today = new Date();
            const orderDate = new Date(props.date);
            const difference = today.getDate() - orderDate.getDate()
            const timezone = orderDate.toString().split(' ')[5];
            const time = orderDate.toString().split(' ')[4];
            let days = 'дней';
            if (difference%10<5) days= 'дня'
            if (difference%10===1) days= 'день'
            let date = `${difference} ${days} назад`
            if (difference===1) date='Вчера'
            if (difference===0) date='Сегодня'
            
            return `${date}, ${time} ${timezone}`
        }
    }, [props.date])
    

    return (
        <li className={`${styles.container}`} onClick={()=>{history.push({pathname: `/feed/${props._id}`})}}>
            <p className={`${styles.dateNumber} mt-6 mb-6`}>
                <span className={`text text_type_digits-default`}>#{props.number}</span>
                <span className={`text text_type_main-default text_color_inactive`}>{timeText}</span>
            </p>
            <h2 className={`${styles.burgerName} text text_type_main-medium mb-6`}>{props.name}</h2>
            <section className={`${styles.componentsPrice} mb-6`}>
                <ul className={`${styles.iconList}`}>
                    
                            {[...props.icons].reverse().map(icon=>(
                                <li className={`${styles.iconWrapperRelative}`}>
                                    <div className={`${styles.iconWrapperAbsolute}`}>
                                         <IngredientIcon {...icon} />
                                    </div>
                                </li>
                            
                            ))}
                        
                </ul>
                <div className={styles.price}>
                    <span className="text text_type_digits-default">{props.price}&nbsp;</span>
                    <CurrencyIcon type='primary' />
                </div>                
            </section>
        </li>
    )
}

CardOrder.propTypes = {
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    icons: PropTypes.shape({
        image: PropTypes.string.isRequired,
        count: PropTypes.number,
    })
}

export default CardOrder;