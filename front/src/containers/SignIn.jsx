import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { authenticate } from '../services/main.service';
import useAuthentification from '../hooks/useAuthentification';

const SignIn = () => {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const [serverError, setServerError] = useState();
    const authenticationState = useAuthentification();

    if (authenticationState && authenticationState.isAuthenticated) {
        document.location.href = '/';
    }

    async function onSubmit(data) {
        const authenticationResult = await authenticate(data);
        if (authenticationResult.success) {
            localStorage.setItem('token', authenticationResult.token);
            document.location.href = '/';
        } else {
            setServerError({ authentication: authenticationResult.message });
        }
    }

    return (
        <section className="signin hero is-fullheight">
            {authenticationState && !authenticationState.isAuthenticated
                && (
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-black">Connexion</h3>
                                <hr className="login-hr" />
                                <p className="subtitle has-text-black">Connectez-vous pour continuer.</p>
                                <div className="box">
                                    <figure className="avatar">
                                        <span className="fa fa-5x fa-user-circle has-background-white" style={{ borderRadius: '50%', color: 'lightgray', padding: '2px', boxShadow: '0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)' }}> </span>
                                    </figure>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {serverError && <div className="message is-danger"><div className="message-header">{serverError.authentication}</div></div>}
                                        <div className="field">
                                            <div className="control">
                                                <input name="username" ref={register({ required: true, message: 'toto' })} className="input is-large" type="text" placeholder="Nom d'utilisateur" />
                                                {errors.username && <p className="help is-danger">Veuillez saisir votre nom d&apos;utilisateur</p>}
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="control">
                                                <input name="password" ref={register({ required: true })} className="input is-large" type="password" placeholder="Mot de passe" />
                                                {errors.password && <p className="help is-danger">Veuillez saisir votre mot de passe</p>}
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="checkbox">
                                                <input type="checkbox" name="rememberme" ref={register} /> Se souvenir de moi
                                            </label>
                                        </div>
                                        <button className="button is-block is-info is-large is-fullwidth">Login <i className="fas fa-sign-in-alt" aria-hidden="true"> </i></button>
                                    </form>
                                </div>
                                <p className="has-text-grey">
                                    <a href="/signup">Créer un compte</a> &nbsp;·&nbsp;
                                    <a href="/forgotpassword">Mot de passe oublié ?</a> &nbsp;·&nbsp;
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

export default SignIn;
