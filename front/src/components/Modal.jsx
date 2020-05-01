import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ titre, contenu, action, close, labelYes, labelNo }) => {
    return (<div className={`modal is-active`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{titre}</p>
                    <button className="delete" aria-label="close" onClick={() => { close();}}></button>
                </header>
                <section className="modal-card-body">
                    {contenu}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={() => { action(); close(); }}>{labelYes}</button>
                    <button className="button" onClick={() => { close();}}>{labelNo}</button>
                </footer>
            </div>
        </div>);
}

const needConfirmation = ({ action, titre = "Confirmation", message = "Souhaitez-vous vraiment faire cela ?", labelYes = "Oui", labelNo = "Non" }) => {
    ReactDOM.render(<Modal 
        titre={titre}
        contenu={message}
        labelYes={labelYes}
        labelNo={labelNo}
        close = {() => closeModale()}
        action={() => { return action(); }} />, document.getElementById("modale"));
}

const closeModale = () => {
    ReactDOM.render(<React.Fragment></React.Fragment>, document.getElementById("modale"));
}

export { Modal, needConfirmation };