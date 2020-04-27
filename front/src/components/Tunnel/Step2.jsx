import React from 'react';
import {
    Field,
} from 'formik';

const Step2 = () => {

    return (
        <>
                <label className="label">Nom :</label>
                <Field type="text" className="input" name="nom" />

                <label className="label">Prénom :</label>
                <Field type="text" className="input" name="prenom" />
        </>
    );
}

export default Step2;