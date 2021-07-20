import styles from './ProfileNavMenu.module.css'
import {useHistory, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../services/actions/user'

export default function ProfileNavMenu() {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()

    return (
        <div className="mr-15">
        <nav className={`${styles.navBar} mb-20`}>
            <span className={`text text_type_main-medium ${location.pathname==='/profile'?'':'text_color_inactive'} ${styles.navLink}`} onClick={()=>history.push({pathname: '/profile'})}>Профиль</span>
            <span className={`text text_type_main-medium ${location.pathname.indexOf('/profile/orders')===0?'':'text_color_inactive'} ${styles.navLink}`} onClick={()=>history.push({pathname: '/profile/orders'})}>История заказов</span>
            <span className={`text text_type_main-medium text_color_inactive ${styles.navLink}`} onClick={()=>dispatch(userLogout())}>Выход</span>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете<br/>
        изменить свои персональные данные
        </p>
        </div>
    )
}