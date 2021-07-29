import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import NavMenuItem from '../NavMenuItem/NavMenuItem'
import headerStyles from './AppHeader.module.css'
import {Link} from 'react-router-dom'

function AppHeader () {
    return (
        <header className={headerStyles.navPanel}>
            <nav className={`${headerStyles.navPanelContent} mt-4 mb-4`}>
                <ul className={headerStyles.navLeft}>
                    <NavMenuItem label="Конструктор" icon={BurgerIcon} pathname={'/'}/>
                    <NavMenuItem label="Лента заказов" icon={ListIcon} pathname={'/feed'} />
                </ul>
                <Link to='/'>
                    <Logo />
                </Link>
                <ul className={headerStyles.navRight}>
                    <NavMenuItem label="Личный Кабинет" icon={ProfileIcon}  pathname={'/profile'} />
                </ul>
            </nav>
        </header>
        

            );

}

export default AppHeader;