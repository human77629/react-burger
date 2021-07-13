import React from "react";
import { useHistory } from 'react-router-dom'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx'
import headerStyles from './AppHeader.module.css'

function AppHeader () {
    const history = useHistory();
    return (
        <header className={headerStyles.navPanel}>
            <nav className={`${headerStyles.navPanelContent} mt-4 mb-4`}>
                <ul className={headerStyles.navLeft}>
                    <NavMenuItem label="Конструктор" icon={BurgerIcon} selected/>
                    <NavMenuItem label="Лента заказов" icon={ListIcon} />
                </ul>

                <Logo />

                <ul className={headerStyles.navRight} onClick={()=>history.replace({pathname: '/profile'})}>
                    <NavMenuItem label="Личный Кабинет" icon={ProfileIcon} />
                </ul>
            </nav>
        </header>
        

            );

}

export default AppHeader;