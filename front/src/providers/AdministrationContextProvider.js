import React, { useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { getUsers, deleteUser, deleteRole, addRole, getRoles } from './admin.utils';

const AdminContext = React.createContext();

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { isLoading: true, isLoadingRoles: true, });

    //empty context provider
    const getUserList = () => {
        return getUsers(localStorage.getItem('token'))
            .then((result) => {
                dispatch({ type: "GET_USERS_OK", result: result.data });
            });
    }

    const removeUser = (id) => {
        return deleteUser(id, localStorage.getItem('token'));
    }

    const removeRole = (username, role) => {
        return deleteRole(username, role, localStorage.getItem('token'));
    }

    const grantRole = (username, role) => {
        return addRole(username, role, localStorage.getItem('token'))
            .then((result) => {
                //console.log("delete role:", result);
            });
    }

    const getAllRoles = () => {
        return getRoles(localStorage.getItem('token')).then(result => {
            dispatch({ type: "GET_ROLES_OK", result: result.data });
        });
    }

    const sharedState = {
        ...state,
        getUserList,
        removeUser,
        grantRole,
        removeRole,
        getAllRoles,
    };

    return (
        <AdminContext.Provider value={sharedState}>
            {children}
        </AdminContext.Provider>
    );
};

const AdminContextConsumer = AdminContext.Consumer;

export { AdminContextProvider, AdminContextConsumer, AdminContext };
