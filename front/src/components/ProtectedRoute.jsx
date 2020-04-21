import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../providers/UserContextProvider';

const ProtectedRoute = (props) => {
    const userContext = useContext(UserContext);
    const { user } = userContext;
    if (user.isAuthenticated) {
        if (props.checkActive && !user.data.isActive) {
            return <Redirect to={{ pathname: '/activate', state: { rejectMessage: props.rejectMessage } }} />;
        }
        return <Route {...props} />;
    }
    return <Redirect to="/signin" />;
};

export default ProtectedRoute;
