import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createAccount } from '../services/main.service';
import useAuthentification from '../hooks/useAuthentification';

const SignUp = () => {
    const { register, watch, handleSubmit, errors } = useForm(); // initialize the hook
    const [serverError, setServerError] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const authenticationState = useAuthentification();

    if (authenticationState && authenticationState.isAuthenticated) {
        document.location.href = '/';
    }

    async function onSubmit(data) {
        const result = await createAccount(data);
        if (result.status === 'error') {
            setServerError(result.message);
            setSuccessMessage('');
        } else {
            setServerError('');
            setSuccessMessage(`Compte ${result.message}`);
        }
    }

    const password = watch('password');

    return (
        <section className="signin hero is-fullheight">
            {authenticationState && !authenticationState.isAuthenticated
                && (
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-black">Créer un compte</h3>
                                <hr className="login-hr" />
                                <p className="subtitle has-text-black">En quelques secondes !</p>
                                <div className="box">
                                    <figure className="avatar">
                                        <span className="fa fa-5x fa-user-circle has-background-white" style={{ borderRadius: '50%', color: 'lightgray', padding: '2px', boxShadow: '0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)' }}> </span>
                                    </figure>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {serverError && <div className="message is-danger"><div className="message-header">{serverError}</div></div>}
                                        {successMessage
                                            && (
                                                <div className="message is-success">
                                                    <div className="message-header">
                                                        {successMessage}
                                                    </div>
                                                    <div className="message-body">Un e-mail contenant un code d&apos;activation vous a été envoyé. <a href="/signin">Connectez-vous à votre compte</a></div>
                                                </div>
                                            )
                                        }
                                        <div className="field">
                                            <div className="control">
                                                <input name="username" ref={register({ required: true })} className="input is-large" type="text" placeholder="Nom d'utilisateur" />
                                                {errors.username && <p className="help is-danger">Veuillez saisir votre nom d&apos;utilisateur</p>}
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input name="email" ref={register({ required: true })} className="input is-large" type="email" placeholder="E-mail" />
                                                {errors.email && <p className="help is-danger">Veuillez saisir votre adresse e-mail</p>}
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input name="birthdate" ref={register({ required: true })} className="input is-large" type="date" placeholder="Date de naissance" />
                                                {errors.birthdate && <p className="help is-danger">Veuillez saisir votre date de naissance</p>}
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input name="password" ref={register({ required: true })} className="input is-large" type="password" placeholder="Mot de passe" />
                                                {errors.password && <p className="help is-danger">Veuillez saisir votre mot de passe</p>}
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input name="passwordrepeat" ref={register({ required: true, validate: { differentPasswords: value => value === password } })} className="input is-large" type="password" placeholder="Confirm. mot de passe" />

                                                {errors.passwordrepeat && (errors.passwordrepeat.type === 'differentPasswords' ? <p className="help is-danger">Les mots de passes sont différents</p> : <p className="help is-danger">Veuillez re-saisir votre mot de passe</p>)}
                                            </div>
                                        </div>
                                        <button className="button is-block is-info is-large is-fullwidth">Créer un compte <i className="fas fa-sign-in-alt" aria-hidden="true"> </i></button>
                                    </form>
                                </div>
                                <p className="has-text-grey">
                                    <a href="/signin">J&apos;ai déjà un compte</a> &nbsp;·&nbsp;
                                    <a href="/help">Besoin d&apos;aide ?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default SignUp;
