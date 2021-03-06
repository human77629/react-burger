import React from "react";
import ReactDOM from "react-dom";
import modalStyles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modal-root");


interface Props {
    isOpen: boolean,
    children: React.ReactNode,
    closeCallback: () => void,
    header?: string,
}


const Modal:React.FC<Props> = (props:Props) => {
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

export default Modal;