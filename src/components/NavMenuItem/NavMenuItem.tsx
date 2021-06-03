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
            <li className={`${navMenuItemStyles.menuItem} pt-4 pb-4 pr-5 pl-5`}>  
            <div className={'m-1'}>
                <NavIcon type={this.props.selected?'primary':'secondary'} />
                
                </div>
                <span className={"text text_type_main-default"+(this.props.selected?'':' text_color_inactive')+' m-1'}>{this.props.label}</span>
            </li>
        );
    }
    
}


export default NavMenuItem;