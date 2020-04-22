import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Formik,
    Form,
    Field,
} from 'formik';

import { UserContext } from '../providers/UserContextProvider';

const Profile = () => {
    const userContext = useContext(UserContext);
    const { user } = userContext;

    const submitProfilePicture = (values) => {
        const formData = new FormData();
        formData.append('avatar', values.avatar);
        return user.uploadProfilePicture(localStorage.getItem('token'), formData).then(() => {
            user.refreshAuth();
        });
    };

    const AutoSubmitForm = ({ values, submitForm, setFieldValue }) => {
        useEffect(() => {
            if (values.avatar) {
                submitForm().then(() => { setFieldValue('avatar', null); });
            }
        }, [values.avatar != null]);

        return null;
    };

    return (
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column is-one-third">
                        <div className="content">
                            <figure className="image is-128x128">
                                <img className="is-rounded" alt="profile" src={`${user.data.avatarUrl}`} />
                            </figure>
                            <Formik
                              initialValues={{ avatar: null }}
                              onSubmit={submitProfilePicture}>
                                {({ setFieldValue, values, submitForm }) => (
                                    <div>
                                    <Form autoComplete="off">
                                        <div className="field">
                                            <div className="file is-primary">
                                                <label className="file-label">

                                                    <Field name="avatar">
                                                        {() => (
                                                            <input
                                                              name="avatar"
                                                              className="file-input"
                                                              type="file"
                                                              onChange={(event) => {
                                                                setFieldValue('avatar', event.target.files[0]);
                                                              }} />
                                                        )}
                                                    </Field>
                                                    <span className="file-cta">
                                                        <span className="file-icon">
                                                            <i className="fas fa-upload"> </i>
                                                        </span>
                                                        <span className="file-label">
                                                            Choisir une image…
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </Form>
                                    <AutoSubmitForm
                                      values={values}
                                      submitForm={submitForm}
                                      setFieldValue={setFieldValue} />
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="column">
                        <div className="content">
                            <p>Nom d&apos;utilisateur : {`${user.data.username}`}</p>
                            <p>Adresse e-mail : {`${user.data.email}`}</p>
                            <p>Mot de passe : ************** <Link to="/password">Changer</Link></p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Profile;
