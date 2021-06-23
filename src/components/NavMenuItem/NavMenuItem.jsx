import React from "react";
import PropTypes from 'prop-types';
import navMenuItemStyles from './NavMenuItem.module.css';



function NavMenuItem (props) {
    
    const NavIcon = props.icon;
    return (
        <li className={`${navMenuItemStyles.menuItem} pt-4 pb-4 pr-5 pl-5`}>  
        <div className={'m-1'}>
            <NavIcon type={props.selected?'primary':'secondary'} />
            
            </div>
            <span className={"text text_type_main-default"+(props.selected?'':' text_color_inactive')+' m-1'}>{props.label}</span>
        </li>
    );
}

NavMenuItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
}


export default NavMenuItem;