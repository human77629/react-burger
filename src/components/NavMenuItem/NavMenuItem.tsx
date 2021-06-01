import React from "react";
import navMenuItemStyles from './NavMenuItem.module.css';


interface Props {
    icon: any,
    label: any,
    selected?: boolean
}

class NavMenuItem extends React.Component<Props> {
    render = () => {
        const NavIcon = this.props.icon;
        return (
            <li className={navMenuItemStyles.menuItem}>  
                <NavIcon type={this.props.selected?'primary':'secondary'} />
                <span className={"text text_type_main-default"+(this.props.selected?'':' text_color_inactive')}>{this.props.label}</span>
            </li>
        );
    }
    
}


export default NavMenuItem;