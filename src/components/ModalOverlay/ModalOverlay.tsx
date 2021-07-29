import ModalOverlayStyles from './ModalOverlay.module.css';


interface Props {
    isOpen: boolean,
    onClick: ()=>void,
}

function ModalOverlay(props:Props) {
    return (
        <div className={props.isOpen?ModalOverlayStyles.overlay:ModalOverlayStyles.overlayHidden} onClick={props.onClick}>
        </div>
    )
}


export default ModalOverlay;