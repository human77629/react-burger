import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal-root");



function Modal(props) {
    return (modalRoot && ReactDOM.createPortal(
    (
        <>
        <section className={props.isOpen?modalStyles.modal:modalStyles.modalHidden}>
            <header className={modalStyles.modalHeader}>
                <h1 className={`${modalStyles.modalTitle} text text_type_main-large`}>{props.header}</h1>
                <button className={modalStyles.closeButton} onClick={props.closeCallback}>
                    <CloseIcon type="primary" />
                </button>
            </header>
            {props.children}
        </section>

        <ModalOverlay isOpen={props.isOpen} onClick={props.closeCallback} />
        </>
    ),
        modalRoot
    ))
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node,
    closeCallback: PropTypes.func.isRequired,
    header: PropTypes.string
}


export default Modal;