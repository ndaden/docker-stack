import React, { useState } from 'react';
import axios from 'axios';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
} from 'formik';
import * as config from '../../config';
import SignUpSchema from './ValidationSchemas/SignUpSchema';
import NotificationCard from './NotificationCard';

const SignupForm = () => {
    const [result, setresult] = useState(undefined);

    return (
        <div className="container is-fluid">
            <div className="columns">
                <div className="column">
                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validationSchema={SignUpSchema}
                        onSubmit={
                            (values, { setSubmitting }) => {
                                axios.post(`${config.API_URI}${config.API_USERS}`, values)
                                    .then((response) => {
                                        setSubmitting(false);
                                        setresult(response.data);
                                    })
                                    .catch((error) => {
                                        setSubmitting(false);
                                        setresult(error.response.data);
                                    });
                            }
                        }>
                        {({ isSubmitting, errors, touched }) => (
                            <Form autoComplete="off">
                                <div className="field">
                                    <label className="label">Nom d&apos;utilisateur<span> *</span></label>
                                    <div className="control">
                                        <Field type="text" className={`input ${errors.username && touched.username ? 'is-danger' : ''}`} name="username" />
                                    </div>
                                    <ErrorMessage name="username" className="help is-danger" component="p" />
                                </div>

                                <div className="field">
                                    <label className="label">E-mail</label>
                                    <div className="control">
                                        <Field type="text" className={`input ${errors.email && touched.email ? 'is-danger' : ''}`} name="email" />
                                    </div>
                                    <ErrorMessage name="email" className="help is-danger" component="p" />
                                </div>

                                <div className="field">
                                    <label className="label">Mot de passe</label>
                                    <div className="control">
                                        <Field type="password" className={`input ${errors.password && touched.password ? 'is-danger' : ''}`} name="password" />
                                    </div>
                                    <ErrorMessage name="password" className="help is-danger" component="p" />
                                </div>

                                <button type="submit" className="button is-success" disabled={isSubmitting}>
                                    Créer mon compte
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="column">
                    {result
                        && (
                            <NotificationCard id="account-created" type={`${result.success ? 'success' : 'error'}`} title={`${result.success ? 'Felicitations' : 'Attention'}`} body={result.message} />
                        )}
                    <NotificationCard type="success" title="Une autre info" body="Un info dans la page de connexion" />
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
