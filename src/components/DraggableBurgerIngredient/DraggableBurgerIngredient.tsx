import React from 'react'
import styles from './DraggableBurgerIngredient.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from 'react-dnd';
import {useDispatch} from '../../services/hooks';
import { MOVE_TOPPING } from "../../services/actions/burger";
import {TIngredient} from '../../services/types'


interface Props {
    handleClose: () => void,
    component: TIngredient,
    index: number,
}




const DraggableBurgerIngredient:React.FC<Props> = (props:Props) => {

    const DropPreview = () => {
        
        return (
            <div className={`${styles.ingredientFix} ${styles.dropTransparency} pl-8`}>
                <ConstructorElement text={hoveringItem.ingredient.name} thumbnail={hoveringItem.ingredient.image} price={hoveringItem.ingredient.price} handleClose={()=>{}}/>
            </div>
        )
    }

    const dispatch = useDispatch();

    const [{isDragging}, dragRef, previewRef] = useDrag({
        type: 'ingredient',
        item: {index: props.index, ingredient: props.component},      
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });



    

    const onDropHandler = (itemId: {index:number}) => {
        dispatch({type: MOVE_TOPPING, currentIndex: itemId.index, targetIndex: props.index});
    }

    const [{isOver, hoveringItem}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(itemId: {index:number}) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            hoveringItem: monitor.getItem(),
        
        })
    });    


    return (
        <>
        {true && (
        <li className={`${styles.component}`} ref={dropTarget}>
            {isOver && hoveringItem.index>props.index && (DropPreview())}
                <div className={`${styles.componentInner} ${isDragging?styles.dragTransparency:''} pl-8`}>
                    <div className={styles.dragIcon} ref={dragRef}>
                        <DragIcon type='primary' />
                    </div>
                    <div className={styles.ingredientFix} ref={previewRef}>
                    <ConstructorElement text={props.component.name} thumbnail={props.component.image} price={props.component.price} handleClose={props.handleClose}/>
                    </div>    
                    
                </div>
            {isOver && hoveringItem.index<props.index && (DropPreview())}
            
        </li>
        )}
        </>
    )
}


export default DraggableBurgerIngredient;