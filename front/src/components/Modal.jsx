import React from 'react';

const Modal = ({
    hasHeader,
    titre,
    children,
    action,
    show,
    close,
    hasFooter,
    labelYes,
    labelNo }) => {
    return (
        <div className={`modal ${show ? 'is-active' : ''} `}>
            <div className="modal-background" onClick={close} role="button"> </div>
            <div className="modal-card">
                {hasHeader && (
                    <header className="modal-card-head">
                        <p className="modal-card-title">{titre}</p>
                        <button className="delete" aria-label="close" onClick={close}> </button>
                    </header>
                )}
                <section className="modal-card-body">
                    {children}
                </section>
                {hasFooter && (
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={() => { action(); close(); }}>{labelYes}</button>
                        <button className="button" onClick={close}>{labelNo}</button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Modal;
