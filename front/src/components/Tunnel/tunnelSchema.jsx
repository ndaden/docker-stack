import * as Yup from 'yup';

const tunnelSchema = (step) => Yup.object().shape({
    immatriculation: Yup.string()
        .required('ce champ est obligatoire'),
    nom: Yup.string()
        .when('immatriculation', (immat, schema) => {
            if (step === 2 && immat !== undefined && immat !== "") {
                return schema.required('obligatoire');
            }
            return schema;
        }),
    prenom: Yup.string()
        .when('immatriculation', (immat, schema) => {
            if (step === 2 && immat !== undefined && immat !== "") {
                return schema.required('obligatoire');
            }
            return schema;
        }),
});

export default tunnelSchema;
