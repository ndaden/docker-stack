import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import SigninForm from './Forms/SigninForm';
import { UserContext } from '../providers/UserContextProvider';

const SignIn = () => {
    const userContext = useContext(UserContext);
    const { user } = userContext;
    if (user && user.isAuthenticated) {
        if (!user.data.isActive) {
            return <Redirect to="/activate" />;
        }
        return <Redirect to="/" />;
    }
    return (
        <SigninForm />
    );
};

export default SignIn;
