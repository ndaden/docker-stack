import React, { useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { getUsers, deleteUser, deleteRole, addRole, getRoles, blockUser } from './admin.utils';

const AdminContext = React.createContext();

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { isLoading: true, isLoadingRoles: true, });

    //empty context provider
    const getUserList = async () => {
        return getUsers(localStorage.getItem('token'))
            .then((result) => {
                dispatch({ type: "GET_USERS_OK", result: result.data });
            });
    }

    const removeUser = async (id) => {
        return await deleteUser(id, localStorage.getItem('token'));
    }

    const blockAccount = async (id, state) => {
        return await blockUser(id, state, localStorage.getItem('token'));
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

    const getAllRoles = async () => {
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
        blockAccount,
    };

    return (
        <AdminContext.Provider value={sharedState}>
            {children}
        </AdminContext.Provider>
    );
};

const AdminContextConsumer = AdminContext.Consumer;

export { AdminContextProvider, AdminContextConsumer, AdminContext };
