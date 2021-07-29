import React from 'react'
import AppHeader from "../components/AppHeader/AppHeader";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from '../services/hooks'
import { getIngredients } from '../services/actions/burger';
import { useParams } from 'react-router-dom'
import styles from './IngredientPage.module.css'

export function IngredientPage () {
    const dispatch = useDispatch()
    const {id} = useParams<{id:string}>()
    React.useEffect(()=>{
        dispatch(getIngredients())
    }, [])
    const ingredients = useSelector(store=>store.burger.ingredients)
    const viewedIngredient = ingredients.find(ingredient=>ingredient._id===id)
    
    
    return (
        <>
        <AppHeader />
        <main className={`${styles.container}`}>
        <h1 className="text text_type_main-large mt-30 mb-10">Детали ингредиента</h1>
        {viewedIngredient && (<IngredientDetails ingredient={viewedIngredient} />)}
        </main>
        </>
    )
}