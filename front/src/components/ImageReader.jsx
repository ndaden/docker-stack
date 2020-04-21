import React, { useState } from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import axios from 'axios';

import * as config from '../config';

const ImageReader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ocr, setOcr] = useState({ result: [], path: '' });

    const submitImageToOcr = (values) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', values.image);
        axios.post(`${config.API_URI}${config.API_OCR}`, formData).then((result) => {
            setIsLoading(false);
            setOcr(result.data);
        });
    };

    return (
        <section className="section">
            <div className="columns">
                <div className="column is-one-quarter">
                rien
                </div>
                <div className="column">
                <figure className="image is-16by9 has-text-centered">
                {ocr.result.length > 0 && console.log(ocr.path)}
                {ocr.result.length > 0 && <img alt="to read" src={ocr.path} />}
                {ocr.result.length === 0 && <img alt="to read" src="https://bulma.io/images/placeholders/128x128.png" />}
                </figure>
                    <Formik
                      initialValues={{ image: null }}
                      onSubmit={submitImageToOcr}>
                        {({ setFieldValue, values }) => (
                                <Form autoComplete="off" className="is-centered">
                                    <div className="field">
                                        <div className="file is-primary is-centered is-boxed has-name">
                                            <label className="file-label">
                                                <Field name="image">
                                                    {() => (
                                                        <input
                                                          name="image"
                                                          className="file-input"
                                                          type="file"
                                                          onChange={(event) => {
                                                                setFieldValue('image', event.target.files[0]);
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
                                                <span className="file-name">
                                                    {values && values.image && values.image.name}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="is-centered">
                                        <button type="submit" className="button is-success">Envoyer</button>
                                    </div>
                                </Form>
                        )}
                    </Formik>
                    {isLoading && <progress className="progress is-danger" max="100">30%</progress>}
                    {ocr.result.length > 0
                        && (
                            <article className="message">
                                <div className="message-header">
                                    <p>Resultat</p>
                                </div>
                                <div className="message-body">
                                    {ocr.result.map((line, i) => (
                                        <p key={i.toString()}>{line}</p>
                                    ))}
                                </div>
                            </article>
                        )}
                </div>
                <div className="column is-one-quarter">
                rien
                </div>
            </div>
        </section>
    );
};

export default ImageReader;
