import React from "react";
import {useSelector} from '../../services/hooks';
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";



interface Props {
    handleIngredientClick: () => void,
}


function BurgerIngredients (props:Props) {

    const order = useSelector( store=> store.burger.selectedIngredients )
    const ingredients = useSelector( store => store.burger.ingredients )

    const selectedIngredientCount = React.useMemo(()=>{
        const ingredientIds = [order.bunId, order.bunId, ...order.toppingIds]
        const uniqueIngredientIds = [...new Set(ingredientIds)]
        const idsToCount:{[k:string]: number} = {}
        uniqueIngredientIds.forEach(uid=>{
            idsToCount[uid] = ingredientIds.filter(id=>id===uid).length;
        });
        
        return idsToCount;
    },
        [order.bunId, order.toppingIds]);

    const [currentTab, setCurrentTab] = React.useState('bun');

    const selectTab = (t:string) => {
        setCurrentTab(t);
        const ref = ingredientTypes.find(type=>type.type===t)?.labelRef;
        if (ref) ref.current?.scrollIntoView();
    }

    const scrollHandler = (e:React.UIEvent) => {
        const container = e.target as HTMLElement;
        

        const weightedCategories = ingredientTypes.map(category=> {
            if (!category.labelRef?.current?.offsetTop) return {category: category, weight: 0};
            const relativeLabelOffset = category.labelRef.current.offsetTop - container.offsetTop;
            const resultingLabelDistance = Math.abs(relativeLabelOffset - container.scrollTop);
            return {category: category, weight: resultingLabelDistance}
        })
        
        const closestCategory = weightedCategories.reduce((a,v)=>v.weight<a.weight?v:a,weightedCategories[0]).category;

        setCurrentTab(closestCategory.type);
    }

    const ingredientTypes =
        [
            {type: 'bun', title: 'Булки', labelRef: React.useRef<HTMLInputElement>(null)},
            {type: 'sauce', title: 'Соусы', labelRef: React.useRef<HTMLInputElement>(null)},
            {type: 'main', title: 'Начинки', labelRef: React.useRef<HTMLInputElement>(null)}
        ]

    const tabs = () => (
        <div className={`${burgerIngredientsStyles.tabContainer} mt-6 mb-4`}>
        {ingredientTypes.map((ingredientType, k)=>(
        <Tab key={k} value={ingredientType.type} active={currentTab === ingredientType.type} onClick={selectTab}>
        {ingredientType.title}
        </Tab>
        ))}
    </div>
    )



    return (
        <section className={`${burgerIngredientsStyles.container} ml-5 mr-5`}>
            <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
            {tabs()}
            <ul className={burgerIngredientsStyles.ingredients} onScroll={scrollHandler}>
                {ingredientTypes
                .map((ingredientType,componentTypeKey)=>(
                    <React.Fragment key={componentTypeKey}>
                    <h1 className="text text_type_main-medium mt-6 mb-2" ref={ingredientType.labelRef}>{ingredientType.title}</h1>
                    <ul className={burgerIngredientsStyles.ingredientsContainer}>
                    {ingredients.filter(ingredient=>(ingredient.type===ingredientType.type)).map((ingredient)=>(
                        <BurgerIngredient onClick={props.handleIngredientClick} key={ingredient._id} ingredient={{...ingredient, count: selectedIngredientCount[ingredient._id]||0}} />
                    ))}
                    </ul>
                    </React.Fragment>
                ))}
                

            </ul>
        </section>
    )
}


export default BurgerIngredients;