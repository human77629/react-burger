
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

    const dispatch = useDispatch();

    const [, dragRef, previewRef] = useDrag({
        type: 'ingredient',
        item: {index: props.index},      
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
            hoveringItem: monitor.getItem()
        })
    });    

    return (
        <li className={`${styles.component} pl-8`} ref={dropTarget}>
            <div className={styles.dragIcon} ref={dragRef}>
            <DragIcon type='primary' />
            </div>
            <div className={styles.ingredientFix} ref={previewRef}>
            <ConstructorElement text={props.component.name} thumbnail={props.component.image} price={props.component.price} handleClose={props.handleClose}/>
            </div>
            
            {isOver && hoveringItem.index>props.index && (<div className={styles.dragHoverEffectTop}></div>)}
            {isOver && hoveringItem.index<props.index && (<div className={styles.dragHoverEffectBottom}></div>)}
        </li>
    )
}


export default DraggableBurgerIngredient;