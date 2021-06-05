import React from "react";
import ReactDOM from "react-dom";
import ModalOverlayStyles from './ModalOverlay.module.css';
const modalRoot = document.getElementById("modal-root");

interface Props {
    isOpen: boolean,
    onClick: ()=>void
}

function ModalOverlay(props:Props) {
    return (modalRoot && ReactDOM.createPortal(
    (
        <div className={props.isOpen?ModalOverlayStyles.overlay:ModalOverlayStyles.overlayHidden} onClick={props.onClick}>
        </div>
    ),
        modalRoot
    ))
}


export default ModalOverlay;