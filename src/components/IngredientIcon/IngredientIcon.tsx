import styles from './IngredientIcon.module.css'

interface Props {
    image:string,
    alt?:string,
    count?:number,
}

function IngredientIcon (props:Props) {
    return (
        <div className={styles.container}>
            <div className={styles.borderDiv}></div>
            <div className={styles.backgroundDiv}>
                
            </div>
            
            <img className={styles.illustration} src={props.image} alt={props.alt} />
            {props.count && (<>
                <div className={styles.dim}>
                    
                </div>
                <div className={styles.count}>
                    <p className="text text_type_main-normal">+{props.count}</p>
                </div>
                </>
            )}
        </div>
    )
}

export default IngredientIcon