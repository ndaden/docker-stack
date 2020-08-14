import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { AdminContext } from '../../providers/AdministrationContextProvider';
import InputTag from './InputTag';
import { needConfirmation } from '../Modal';
import Dropdown from '../Dropdown';

const AdminUsers = (props) => {
    const AdministrationContext = useContext(AdminContext);
    const {
        getUserList,
        getAllRoles,
        removeUser,
        blockAccount,
        grantRole,
        removeRole,
        isLoading,
        isLoadingRoles,
        users,
        roles } = AdministrationContext;
    const [refresh, setRefresh] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const onSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const onBlock = async (checked, id) => {
        if (!checked) {
            await blockAccount(id, 'block');
        } else {
            await blockAccount(id, 'unblock');
        }
        setRefresh(refresh + 1);
    };

    const onDeleteUser = async (id) => {
        await removeUser(id);
        setRefresh(refresh + 1);
    }

    useEffect(() => {
        async function loadAll() {
            await getUserList();
            await getAllRoles();
        }
        loadAll();

    }, [refresh]);

    return (isLoading || isLoadingRoles) ?
        <p>Chargement...</p> :
        (
            <React.Fragment>
                <div className="is-flex">
                    <button className="button is-primary" onClick={() => setRefresh(refresh + 1)}>
                        <span>Actualiser</span>
                        <span className="icon">
                            <i className="fas fa-sync" />
                        </span>
                    </button>
                    <div className="field">
                        <div className="control">
                            <input type="text" className="input" placeholder="Rechercher" onChange={onSearch} />
                        </div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Nom d'utilisateur</th>
                            <th>Email</th>
                            <th>Code d'activation</th>
                            <th>Roles</th>
                            <th>Bloqué</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(u =>
                                u.username.toLocaleUpperCase().includes(searchQuery.toLocaleUpperCase()) ||
                                u.email.toLocaleUpperCase().includes(searchQuery.toLocaleUpperCase())
                            )
                            .map(user => (
                                <tr key={user._id} id={user.username}>
                                    <td>
                                        <figure className="image is-48x48">
                                            {user.avatarUrl
                                                ? <img className="is-rounded" src={user.avatarUrl} alt={user.username} />
                                                : <span className="icon"><i className="is-large is-centered fas fa-user-circle" /></span>}
                                        </figure>
                                    </td>
                                    <td>{user.username} {user.isActive && <i className="fas fa-star has-text-success" title="compte activé" />}</td>
                                    <td id={`email-${user.username}`}>{user.email}</td>
                                    <td id={`activationcode-${user.username}`}>
                                        {user.activationCode
                                        ? (
                                            <div className="is-flex" style={{ justifyContent: 'space-between' }}>
                                                <div>{user.activationCode.validationCode ? user.activationCode.validationCode : '-'}</div>
                                                <div>{user.activationCode.validationCodeExpirationDate && moment().isAfter(user.activationCode.validationCodeExpirationDate) ? <span className="tag is-danger">expiré</span> : <span className="tag is-success">valide</span>}</div>
                                            </div>
                                            ) : <span>-</span>
                                        }
                                    </td>
                                    <td id={`roles-${user.username}`}>
                                        <InputTag
                                            placeholder="Saisir un rôle"
                                            tags={user.roles.map(r => r.roleCode).join(',')}
                                            allTags={roles.map(r => r.roleCode)}
                                            removeTagCb={removeRole}
                                            addTagCb={grantRole}
                                            username={user.username} />
                                    </td>
                                    <td id={`block-${user.username}`}>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={user.isBlocked}
                                            onChange={(e) => { e.persist(); needConfirmation({ action: () => { onBlock(e.target.checked, user._id); } }) }} />
                                    </td>
                                    <td id={`actions-${user.username}`}>
                                        <Dropdown key={user._id}>
                                            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                                <div className="dropdown-content">
                                                    <a href="#" className="dropdown-item">
                                                        Modifier
                                        </a>
                                                    <a className="dropdown-item" onClick={() => needConfirmation({ action: () => { onDeleteUser(user._id); } })}>
                                                        Supprimer
                                        </a>
                                                </div>
                                            </div>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
};

export default AdminUsers;
