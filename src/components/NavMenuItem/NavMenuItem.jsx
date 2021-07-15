import React from "react";
import PropTypes from 'prop-types';
import navMenuItemStyles from './NavMenuItem.module.css';
import {useHistory, useLocation} from 'react-router-dom'



function NavMenuItem (props) {
    const history = useHistory();
    const location = useLocation();
    const selected = React.useMemo(()=>{
        console.log(location.pathname)
        console.log(props.pathname)
        return (location.pathname === props.pathname)
    }, [location.pathname, props.pathname])
    const handleClick = () => {
        if(props.pathname) history.push({pathname: props.pathname})
    }
    
    const NavIcon = props.icon;
    return (
        <li className={`${navMenuItemStyles.menuItem} pt-4 pb-4 pr-5 pl-5`} onClick={handleClick}>  
        <div className={'m-1'}>
            <NavIcon type={selected?'primary':'secondary'} />
            
            </div>
            <span className={"text text_type_main-default"+(selected?'':' text_color_inactive')+' m-1'}>{props.label}</span>
        </li>
    );
}

NavMenuItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    pathname: PropTypes.string
}


export default NavMenuItem;