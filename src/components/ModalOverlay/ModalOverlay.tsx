import React from "react";
import PropTypes from 'prop-types';
import ModalOverlayStyles from './ModalOverlay.module.css';

interface Props {
    isOpen: boolean,
    onClick: ()=>void
}

function ModalOverlay(props:Props) {
    return (
        <div className={props.isOpen?ModalOverlayStyles.overlay:ModalOverlayStyles.overlayHidden} onClick={props.onClick}>
        </div>
    )
}

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}


export default ModalOverlay;