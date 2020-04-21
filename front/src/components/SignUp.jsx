import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import SignupForm from './Forms/SignupForm';
import { UserContext } from '../providers/UserContextProvider';

const SignUp = () => {
    const userContext = useContext(UserContext);
    const { user } = userContext;

    if (user.isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <SignupForm />
    );
};

export default SignUp;
