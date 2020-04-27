import React, { useState } from 'react';
import {
    Formik,
    Form,
    ErrorMessage,
} from 'formik';

import Step1 from './Step1';
import Step2 from './Step2';
import Summary from './Summary';

import tunnelSchema from './tunnelSchema';

const lastStep = 2;
const steps = [
    { id: 1, name: "Identification du véhicule", icone: "vehicule", canGoBack: false },
    { id: 2, name: "Identité du conducteur", icone: "conducteur", canGoBack: true },
    { id: 3, name: "Synthèse", icone: "synthese", canGoBack: false },
]
const Stepper = () => {
    const [step, setStep] = useState(1);
    const [inRecap, setInRecap] = useState(false);

    const onSubmit = (values) => {
        if (step < lastStep + 1 && inRecap) {
            setStep(lastStep + 1);
        }
        if (step < lastStep + 1 && !inRecap) {
            setStep(step + 1);
        }

        if(step === lastStep) {
            setInRecap(true);
        }

        if (step === lastStep + 1) {
            console.log("données envoyées :", values);
        }
    };

    const onBack = (e) => {
        e.preventDefault();
        if (step > 1) {
            setStep(step - 1);
        }
    }
    return (
        <div className="container is-fluid">
            {inRecap && steps.map((s, k) =>
                <span key={s.id}><a onClick={() => setStep(s.id)}>{s.icone}</a> -</span>
            )
            }
            {step < lastStep + 1 && !inRecap && steps.map((s, k) =>
                <span key={s.id} className={s.id === step ? "has-text-weight-bold" : ""}>{s.icone} -</span>
            )
            }
            <Formik
                initialValues={{ immatriculation: '', nom: '', prenom: '' }}
                validationSchema={tunnelSchema(step)}
                onSubmit={onSubmit}>
                {({ values, errors, touched }) => {

                    return (
                        <Form>
                            {step === 1 && <Step1 />}
                            {step === 2 && <Step2 />}
                            {step === 3 && <Summary data={values} />}

                            {step <= lastStep && (<span><pre>Errors : {JSON.stringify(errors)}</pre>
                                <pre>Values : {JSON.stringify(values)}</pre></span>)}

                            {!inRecap && steps.find(s => s.id === step).canGoBack && <button className="button is-secondary" onClick={onBack}>Précédent</button>}
                            <button type="submit" className="button is-success">
                                {!inRecap && (step === lastStep + 1 ? "Soumettre" : "Suivant")}
                                {inRecap && "Valider" }
                            </button>
                        </Form>);
                }}
            </Formik>
        </div>
    );
}

export default Stepper;