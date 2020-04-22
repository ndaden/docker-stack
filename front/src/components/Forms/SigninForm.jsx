import React, { useContext } from 'react';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';

import SignInSchema from './ValidationSchemas/SignInSchema';
import NotificationCard from './NotificationCard';

import { UserContext } from '../../providers/UserContextProvider';

const SignInForm = () => {
    const userContext = useContext(UserContext);

    const { isLoading, user, loginData } = userContext;

    const submitSignInForm = (values) => {
        user.handleLogin(values);
    };

    user.checkAuth(loginData);

    return (
        <div className="container is-fluid">
            <div className="columns">
                <div className="column">
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={SignInSchema}
                        onSubmit={submitSignInForm}>
                        {({ errors, touched }) => (
                            <Form autoComplete="off">
                                <div className="field">
                                    <label className="label">Nom d&apos;utilisateur<span> *</span></label>
                                    <div className="control">
                                        <Field type="text" className={`input ${errors.username && touched.username ? 'is-danger' : ''}`} name="username" />
                                    </div>
                                    <ErrorMessage name="username" className="help is-danger" component="p" />
                                </div>

                                <div className="field">
                                    <label className="label">Mot de passe</label>
                                    <div className="control">
                                        <Field type="password" className={`input ${errors.password && touched.password ? 'is-danger' : ''}`} name="password" />
                                    </div>
                                    <ErrorMessage name="password" className="help is-danger" component="p" />
                                </div>

                                <button type="submit" className="button is-success" disabled={isLoading}>
                                    Se connecter
                            </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="column">
                    {loginData && loginData.message !== undefined
                        && (
                            <NotificationCard type={`${loginData.success ? 'success' : 'error'}`} title={`${loginData.success ? 'Felicitations' : 'Attention'}`} body={loginData.message} />
                        )}
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
