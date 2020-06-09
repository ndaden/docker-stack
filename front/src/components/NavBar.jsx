import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserContextProvider';

import * as config from '../config';

const NavBar = () => {
    const userContext = useContext(UserContext);
    const [active, setActive] = useState(false);
    const toggleBurger = () => setActive(!active);

    const { user } = userContext;
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    My react app <strong>20200502</strong>
                </Link>
                <a role="button" className={`navbar-burger burger ${active ? 'is-active' : ''}`} aria-label="menu" aria-expanded="true" data-target="nvmenu" onClick={toggleBurger}>
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>

            <div className={`navbar-menu ${active ? 'is-active' : ''}`} id="nvmenu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/" onClick={toggleBurger}>
                        Home
                </Link>
                    <Link className="navbar-item" to="/toto" onClick={toggleBurger}>
                        Toto
                </Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">Autres</a>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/adminusers" onClick={toggleBurger}>Admin Utilisateurs</Link>
                            <Link className="navbar-item" to="" onClick={toggleBurger}>Autre Truc</Link>
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                    {
                        (user.isAuthenticated)
                        && (
                            <Link className="navbar-item" to="/elastictool" onClick={toggleBurger}>
                                ElasticSearch Admin
                            </Link>
                        )
                    }
                    {
                        (user.isAuthenticated && user.data.roles.includes(config.ROLE_ADMINISTRATOR))
                        && (
                            <Link className="navbar-item" to="/admin/users" onClick={toggleBurger}>
                                Gestion de comptes
                            </Link>
                        )
                    }
                    {(user.isAuthenticated)
                        && (
                            <Link id="username" className="navbar-item" to="/profile" onClick={toggleBurger}>
                                <span className="icon is-medium is-left">
                                    <i className="is-medium fas fa-user-circle"> </i>
                                </span>
                                <span>{`${user.data.username}`}</span>
                            </Link>
                        )}
                    <div className="navbar-item">
                        {
                            (!user.isAuthenticated)
                            && (
                                <div className="buttons">
                                    <Link id="signup" className="button is-primary" to="/signup" onClick={toggleBurger}>Créer un compte</Link>
                                    <Link id="login" className="button is-light" to="/signin" onClick={toggleBurger}>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-sign-in-alt"> </i>
                                        </span>
                                        <span>Se connecter</span>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            (user.isAuthenticated)
                            && (
                                <div className="buttons">
                                    <Link id="logout" className="button is-outlined" to="/logout" onClick={toggleBurger}>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-sign-out-alt"> </i>
                                        </span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
