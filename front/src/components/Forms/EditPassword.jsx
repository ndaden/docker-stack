import React, { useContext, useState } from 'react';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';

import EditPasswordSchema from './ValidationSchemas/EditPasswordSchema';
import NotificationCard from './NotificationCard';

import { UserContext } from '../../providers/UserContextProvider';

const EditPassword = () => {
    const userContext = useContext(UserContext);
    const [result, setResult] = useState({});

    const { isLoading, user, loginData } = userContext;

    const submitChangePasswordForm = (values) => {
        user.changePassword(localStorage.getItem('token'), values).then((res) => {
            setResult(res.data);
        }).catch(error => setResult(error.response.data));
    };

    user.checkAuth(loginData);

    return (
        <div className="container is-fluid">
            <div className="columns">
                <div className="column">
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', newPasswordConfirmation: '' }}
                        validationSchema={EditPasswordSchema}
                        onSubmit={submitChangePasswordForm}>
                        {({ errors, touched }) => (
                            <Form autoComplete="off">
                                <div className="field">
                                    <label className="label">Mot de passe actuel<span> *</span></label>
                                    <div className="control">
                                        <Field type="password" className={`input ${errors.username && touched.username ? 'is-danger' : ''}`} name="oldPassword" />
                                    </div>
                                    <ErrorMessage name="oldPassword" className="help is-danger" component="p" />
                                </div>

                                <div className="field">
                                    <label className="label">Nouveau mot de passe<span> *</span></label>
                                    <div className="control">
                                        <Field type="password" className={`input ${errors.password && touched.password ? 'is-danger' : ''}`} name="newPassword" />
                                    </div>
                                    <ErrorMessage name="newPassword" className="help is-danger" component="p" />
                                </div>

                                <div className="field">
                                    <label className="label">Confirmer le nouveau mot de passe<span> *</span></label>
                                    <div className="control">
                                        <Field type="password" className={`input ${errors.password && touched.password ? 'is-danger' : ''}`} name="newPasswordConfirmation" />
                                    </div>
                                    <ErrorMessage name="newPasswordConfirmation" className="help is-danger" component="p" />
                                </div>

                                <button type="submit" className="button is-success" disabled={isLoading}>
                                    Changer le mot de passe
                            </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="column">
                    {result && result.message !== undefined
                        && (
                            <NotificationCard type={`${result.success ? 'success' : 'error'}`} title={`${result.success ? 'Felicitations' : 'Attention'}`} body={result.message} />
                        )}
                </div>
            </div>
        </div>
    );
};

export default EditPassword;
