import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import NavMenuItem from '../NavMenuItem/NavMenuItem'
import headerStyles from './AppHeader.module.css'

class AppHeader extends React.Component {
    render=()=>(
        <header className={headerStyles.navPanel}>
            <nav className={`${headerStyles.navPanelContent} mt-4 mb-4`}>
                <ul className={headerStyles.navLeft}>
                    <NavMenuItem label="Конструктор" icon={BurgerIcon} selected/>
                    <NavMenuItem label="Лента заказов" icon={ListIcon} />
                </ul>

                <Logo />

                <ul className={headerStyles.navRight}>
                    <NavMenuItem label="Личный Кабинет" icon={ProfileIcon} />
                </ul>
            </nav>
        </header>
        

            );

}

export default AppHeader;