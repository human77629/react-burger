import styles from './IngredientIcon.module.css'
import PropTypes from 'prop-types'

function IngredientIcon (props) {
    return (
        <div className={styles.container}>
            <div className={styles.borderDiv}></div>
            <div className={styles.backgroundDiv}>
                
            </div>
            
            <img className={styles.illustration} src={props.image} />
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

IngredientIcon.propTypes = {
    image: PropTypes.string.isRequired,
    count: PropTypes.number
}

export default IngredientIcon