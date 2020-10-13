import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePassword } from '../services/main.service';
import Modal from './Modal';

const ProfileInformationDefault = ({ username, email, isActive }) => {
    const { register, watch, handleSubmit, errors } = useForm();
    const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
    const [serverResponse, setServerResponse] = useState();

    async function onSubmit(values) {
        console.log(values);
        const result = await changePassword(values);
        setServerResponse(result);
    }

    const newPassword = watch('newPassword');

    return (
        <React.Fragment>
            <div className="card article">
                <div className="card-content">
                    <div className="content article-body">
                        {!isActive && (
                            <article className="message is-warning">
                                <div className="message-body">
                                    Vous devez activer votre compte.
                                </div>
                            </article>
                        )}
                        <div className="columns">
                            <div className="column">
                                <h4>Nom d&apos;utilisateur</h4>
                                <p>{username}</p>
                            </div>
                            <div className="column">
                                <h4>Adresse e-mail</h4>
                                <p>{email}</p>
                            </div>
                        </div>
                        <h4>Mot de passe</h4>
                        <p><a href="#" onClick={(e) => { e.preventDefault(); setShowPasswordChangeModal(true); }}>Modifier mon mot de passe</a></p>
                        <p><a href="#">Clotûrer mon compte</a></p>
                    </div>
                </div>
            </div>
            <Modal show={showPasswordChangeModal} titre="Changement de mot de passe" close={() => setShowPasswordChangeModal(false)} hasHeader>
                {serverResponse && serverResponse.status === 'error' && <div className="message is-danger"><div className="message-header">{serverResponse.message}</div></div>}
                {serverResponse && serverResponse.success && <div className="message is-success"><div className="message-header">{serverResponse.message}</div></div>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <div className="control">
                            <input name="oldPassword" ref={register({ required: true })} className="input is-large" type="password" placeholder="Mot de passe actuel" />
                            {errors.oldPassword && <p className="help is-danger">Veuillez saisir votre mot de passe actuel</p>}
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input name="newPassword" ref={register({ required: true })} className="input is-large" type="password" placeholder="Nouveau mot de passe" />
                            {errors.newPassword && <p className="help is-danger">Veuillez saisir votre nouveau mot de passe</p>}
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input name="newPasswordRepeat" ref={register({ required: true, validate: { differentPasswords: value => value === newPassword } })} className="input is-large" type="password" placeholder="Retapez le nouveau mot de passe" />
                            {errors.newPasswordRepeat && (errors.newPasswordRepeat.type === 'differentPasswords' ? <p className="help is-danger">Les mots de passes sont différents</p> : <p className="help is-danger">Veuillez re-saisir votre mot de passe</p>)}
                        </div>
                    </div>
                    <button className="button is-block is-info is-large is-fullwidth">Changer mon mot de passe <i className="fas fa-sign-in-alt" aria-hidden="true"> </i></button>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default ProfileInformationDefault;
