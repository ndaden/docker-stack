import * as Yup from 'yup';

const EditPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
                    .required('ce champ est obligatoire'),
    newPassword: Yup.string()
                    .required('ce champ est obligatoire'),
    newPasswordConfirmation: Yup.string()
                    .required('ce champ est obligatoire')
                    .oneOf([Yup.ref('newPassword'), null], 'le mot de passe ne correspond pas'),
});

export default EditPasswordSchema;
