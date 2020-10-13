import * as Yup from 'yup';

const ActivationSchema = Yup.object().shape({
    activationCode: Yup.string()
                    .required('ce champ est obligatoire'),
});

export default ActivationSchema;
