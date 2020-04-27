import React from 'react';
import {
    Field,
} from 'formik';

const Step1 = () => {
    return (
       <>
            <label className="label">Immatriculation :</label>
            <Field type="text" className="input" name="immatriculation" placeholder="AB 123 CD"/>
       </>
    );
};

export default Step1;