import React, { useEffect } from 'react';
import Logo from './kubikle.svg';

const NavbarDefault = ({ currentPage, isAuthenticated }) => {
    function isActive(page) {
        if (page === currentPage) {
            return 'is-active';
        }
        return '';
    }

    useEffect(() => {
        function burgerMenu() {
            const burger = document.querySelector('.burger');
            const menu = document.querySelector(`#${burger.dataset.target}`);
            burger.addEventListener('click', () => {
                burger.classList.toggle('is-active');
                menu.classList.toggle('is-active');
            });
        }
        burgerMenu();
    }, []);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="../">
                        <img src={Logo} alt="logo" />
                    </a>
                    <span role="button" className="navbar-burger burger" data-target="navbarMenu">
                        <span />
                        <span />
                        <span />
                    </span>
                </div>
                <div id="navbarMenu" className="navbar-menu">
                    <div className="navbar-end">
                        <a className={`navbar-item ${isActive('/')}`} href="/">
                            Home
                        </a>
                        <a className={`navbar-item ${isActive('/examples')}`} href="/examples">
                            Examples
                        </a>
                        <a className={`navbar-item ${isActive('/team')}`} href="/team">
                            Team
                        </a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Account
                            </a>
                            <div className="navbar-dropdown">
                                <a className={`navbar-item ${isActive('/dashboard')}`} href="/dashboard">
                                    Dashboard
                                </a>
                                {isAuthenticated && (
                                    <a className={`navbar-item ${isActive('/profile')}`} href="/profile">
                                        Profile
                                    </a>
                                )}
                                {!isAuthenticated && (
                                    <a className={`navbar-item ${isActive('/signup')}`} href="/signup">
                                        Create an account
                                    </a>
                                )}
                                <a className={`navbar-item ${isActive('/settings')}`} href="/settings">
                                    Settings
                                </a>
                                {isAuthenticated && (
                                    <React.Fragment>
                                        <hr className="navbar-divider" />
                                        <a className="navbar-item" href="/logout">Logout</a>
                                    </React.Fragment>
                                )}
                                {!isAuthenticated && (
                                    <React.Fragment>
                                        <hr className="navbar-divider" />
                                        <a className="navbar-item" href="/signin">Login</a>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarDefault;
