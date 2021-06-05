import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal-root");

interface Props {
    isOpen: boolean,
    children: React.ReactNode,
    closeCallback: ()=>void,
    header?: string
}

function Modal(props:Props) {
    return (modalRoot && ReactDOM.createPortal(
    (
        <section className={props.isOpen?modalStyles.modal:modalStyles.modalHidden}>
            <header className={modalStyles.modalHeader}>
                <h1 className={`${modalStyles.modalTitle} text text_type_main-large`}>{props.header}</h1>
                <button className={modalStyles.closeButton} onClick={props.closeCallback}>
                    <CloseIcon type="primary" />
                </button>
            </header>
            {props.children}
            <ModalOverlay isOpen={props.isOpen} onClick={props.closeCallback} />
        </section>
    ),
        modalRoot
    ))
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    closeCallback: PropTypes.func.isRequired,
    header: PropTypes.string
}


export default Modal;