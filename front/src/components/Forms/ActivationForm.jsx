import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';

import ActivationSchema from './ValidationSchemas/ActivationSchema';
import NotificationCard from './NotificationCard';

import { UserContext } from '../../providers/UserContextProvider';

const ActivationForm = (props) => {
    const userContext = useContext(UserContext);

    const { isLoading, user } = userContext;

    const { location: { state: { rejectMessage = '' } = {} } = {} } = props;

    const submitActivationCode = (values) => {
        user.activate(values);
        user.refreshAuth();
    };

    const reSendActivationCode = () => {
        user.activate({ email: user.data.email, renew: true });
    };

    if (!user.isAuthenticated) {
        return <Redirect to="/Signin" />;
    }

    return (
        <div className="container is-fluid">
            {rejectMessage && <NotificationCard type="error" title="Activez votre compte !" body={rejectMessage} />}
            <div className="columns">
                <div className="column">
                    <Formik
                        initialValues={{ email: user.data.email, activationCode: '', renew: false }}
                        validationSchema={ActivationSchema}
                        onSubmit={submitActivationCode}>
                        {({ errors, touched }) => (
                            <Form autoComplete="off">
                                <div className="field">
                                    <label className="label">Code d&acute;activation</label>
                                    <div className="control">
                                        <Field type="text" className={`input ${errors.activationCode && touched.activationCode ? 'is-danger' : ''}`} name="activationCode" />
                                    </div>
                                    <ErrorMessage name="activationCode" className="help is-danger" component="p" />
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button type="submit" className="button is-success" disabled={isLoading}>
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-check-circle"> </i>
                                            </span>
                                            <span>Activer mon compte</span>
                                        </button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link" onClick={reSendActivationCode}>
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-redo"> </i>
                                            </span>
                                            <span>Re-envoyer le code</span>
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="column">
                    {user.activationData && user.activationData.message !== undefined
                        && (
                            <NotificationCard type={`${user.activationData.success ? 'success' : 'error'}`} title={`${user.activationData.success ? 'Felicitations' : 'Attention'}`} body={user.activationData.message} />
                        )}
                </div>
            </div>
        </div>
    );
};

export default ActivationForm;
