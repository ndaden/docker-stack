import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../providers/UserContextProvider';

const SignOut = () => {
    const { user } = useContext(UserContext);
    user.logout();
    user.checkAuth();
    return <Redirect to="/" />;
};

export default SignOut;
