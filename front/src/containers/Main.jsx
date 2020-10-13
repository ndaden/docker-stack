import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavbarDefault, HeroDefault, ArticleDefault, PromoDefault, Modal, Footer } from '../components';
import useAuthentification from '../hooks/useAuthentification';
import { activateAccount } from '../services/main.service';

const ActionLink = ({ action, label, successLabel, failureLabel }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(0);
    async function handleClick(ev) {
        ev.preventDefault();
        setLoading(true);
        try {
            await action();
            setSuccess(1);
        } catch (e) {
            setSuccess(2);
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(0), 3000);
        }
    }

    return (
        <React.Fragment>
            {loading && <span className="fas fa-spinner fa-spin"> </span>}
            {!loading && success === 1 && <span className="has-text-success"><span className="fas fa-check-circle"> </span> {successLabel}</span>}
            {!loading && success === 2 && <span className="has-text-danger"><span className="fas fa-exclamation-circle"> </span> {failureLabel}</span>}
            {!loading && success === 0 && <a role="button" onClick={handleClick}>{label}</a>}
        </React.Fragment>
    );
};

const Main = ({ pathname }) => {
    const [isFirstVisit, setIsFirstVisit] = useState();
    const [activationResult, setActivationResult] = useState();

    const authenticationState = useAuthentification();
    const { isAuthenticated = false, data = {} } = authenticationState;
    useEffect(async () => {
        setIsFirstVisit(sessionStorage.getItem('activation_prompt') !== '1');
    }, []);

    function closeActivationModal() {
        setIsFirstVisit(false);
        sessionStorage.setItem('activation_prompt', '1');
    }

    const { register, handleSubmit, errors, getValues } = useForm();

    async function onSubmitActivationCode(values) {
        const result = await activateAccount(values);
        setActivationResult(result);
    }

    return (
        <React.Fragment>
            <NavbarDefault currentPage={pathname} isAuthenticated={isAuthenticated} />
            <HeroDefault />
            <div className="container">
                <section className="articles main">
                    <div className="column is-8 is-offset-2">
                        <ArticleDefault />
                        {isAuthenticated && <PromoDefault />}
                        <ArticleDefault />
                        <ArticleDefault />
                    </div>
                </section>
            </div>
            <Footer />
            {isAuthenticated && (
                <Modal hasHeader titre={`${authenticationState.data.username}, activez votre compte`} show={isFirstVisit && !authenticationState.data.isActive} close={closeActivationModal}>
                    {activationResult && activationResult.success && <div className="message is-success"><div className="message-header">{activationResult.message}</div></div>}
                    {activationResult && !activationResult.success && <div className="message is-danger"><div className="message-header">{activationResult.message}</div></div>}
                    <form onSubmit={handleSubmit(onSubmitActivationCode)}>
                        <div className="field">
                            <div className="control">
                                <input name="activationCode" ref={register({ required: true })} className="input is-large" type="text" placeholder="Code d'activation" />
                                {errors.activationCode && <p className="help is-danger">Veuillez saisir votre code d&apos;activation</p>}
                            </div>
                            <p className="has-text-grey">
                                <ActionLink action={async () => { await activateAccount({ email: getValues().email, renew: true }); }} label="Re-envoyer un code d&apos;activation" successLabel="envoyé" failureLabel="echec" />&nbsp;·&nbsp;
                                <a href="/help">Besoin d&apos;aide ?</a>
                            </p>
                        </div>

                        <input name="email" ref={register()} type="hidden" value={authenticationState.data.email} />
                        <button className="button is-block is-info is-large is-fullwidth">Activer mon compte <i className="fas fa-sign-in-alt" aria-hidden="true"> </i></button>
                    </form>
                </Modal>
            )}
        </React.Fragment>
    );
};

export default Main;
