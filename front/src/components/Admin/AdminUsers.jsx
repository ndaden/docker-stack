import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { AdminContext } from '../../providers/AdministrationContextProvider';
import InputTag from './InputTag';

const AdminUsers = (props) => {
    const AdministrationContext = useContext(AdminContext);
    const { getUserList, getAllRoles, removeUser, grantRole, removeRole, isLoading,isLoadingRoles, users, roles } = AdministrationContext;
    const [refresh, setRefresh] = useState(0);

    const openDropdown = (e) => {
        e.target.parentElement.parentElement.parentElement.classList.toggle('is-active');
    };

    useEffect(() => {
        getUserList();
        getAllRoles();
    }, [refresh]);

    return !(isLoading || isLoadingRoles) && (
        <table className="table">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Code d'activation</th>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>
                            <figure className="image is-48x48">
                                <img className="is-rounded" src={user.avatarUrl} />
                            </figure>
                        </td>
                        <td>{user.username} {user.isActive && <i className="fas fa-star has-text-success" title="compte activé"></i>}</td>
                        <td>{user.email}</td>
                        <td>
                        {user.activationCode !== null ?
                            (<div className="is-flex" style={{ justifyContent: 'space-between'}}>
                                <div>{user.activationCode.validationCode}</div>
                                <div>{moment().isAfter(user.activationCode.validationCodeExpirationDate) ? <span className="tag is-danger">expiré</span> : <span className="tag is-success">valide</span>}</div>
                            </div>) : <span>-</span>
                        }
                        </td>
                        <td>
                        <InputTag 
                            placeholder="Saisir un rôle" 
                            tags={user.roles.map(r => r.roleCode).join(',')}
                            allTags={roles.map(r => r.roleCode)}
                            removeTagCb={removeRole} 
                            addTagCb={grantRole}
                            username={user.username} />
                        </td>
                        <td>
                            <div className="dropdown" key={user._id}>
                                <div className="dropdown-trigger">
                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={(e) => openDropdown(e)}>
                                        <span>Actions</span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                    <div className="dropdown-content">
                                        <a href="#" className="dropdown-item">
                                            Modifier
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            Bloquer
                                        </a>
                                        <a className="dropdown-item" onClick={() => { removeUser(user._id); setRefresh(refresh + 1); }}>
                                            Supprimer
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>))}
            </tbody>
        </table>
    );
};

export default AdminUsers;
