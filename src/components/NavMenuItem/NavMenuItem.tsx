import React from "react";
import navMenuItemStyles from './NavMenuItem.module.css';
import {useHistory, useLocation} from 'react-router-dom'
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface Props {
    icon: ({type}:TIconProps)=>JSX.Element,
    label: string,
    pathname?: string
}

function NavMenuItem (props:Props) {
    const history = useHistory();
    const location = useLocation();
    const selected = React.useMemo(()=>{
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


export default NavMenuItem;