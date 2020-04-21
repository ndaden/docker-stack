import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    username: Yup.string()
                    .required('ce champ est obligatoire'),
    password: Yup.string()
                    .required('ce champ est obligatoire'),
    email: Yup.string()
                    .required('ce champ est obligatoire'),
});

export default SignUpSchema;
