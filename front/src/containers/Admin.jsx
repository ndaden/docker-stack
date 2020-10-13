import React from 'react';

const Admin = () => {
    return (
        <div className="adm">
            {/* START NAV */}
            <nav className="navbar is-white">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item brand-text" href="/admin">
                            Kubik&apos;Admin
                        </a>
                        <div className="navbar-burger burger" data-target="navMenu">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                    <div id="navMenu" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item" href="/admin">
                                Accueil
                            </a>
                            <a className="navbar-item" href="/">
                                Kubikle
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            {/* END NAV */}
            <div className="container">
                <div className="columns">
                    <div className="column is-3 ">
                        <aside className="menu is-hidden-mobile">
                            <p className="menu-label">
                                General
                            </p>
                            <ul className="menu-list">
                                <li><a className="is-active">Dashboard</a></li>
                            </ul>
                            <p className="menu-label">
                                Administration
                            </p>
                            <ul className="menu-list">
                                <li><a>Team Settings</a></li>
                                <li>
                                    <a>Comptes utilisateurs</a>
                                    <ul>
                                        <li><a>Liste des comptes</a></li>
                                        <li><a>Créer un compte</a></li>
                                        <li><a>Rôles</a></li>
                                        <li><a>Utilisateurs bloqués</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column is-9">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li><a href="../">Bulma</a></li>
                                <li><a href="../">Templates</a></li>
                                <li><a href="../">Examples</a></li>
                                <li className="is-active"><a href="#" aria-current="page">Admin</a></li>
                            </ul>
                        </nav>
                        <section className="hero is-info welcome is-small">
                            <div className="hero-body">
                                <div className="container">
                                    <h1 className="title">
                                        Hello, Admin.
                                    </h1>
                                    <h2 className="subtitle">
                                        I hope you are having a great day!
                                    </h2>
                                </div>
                            </div>
                        </section>
                        <section className="info-tiles">
                            <div className="tile is-ancestor has-text-centered">
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">1k</p>
                                        <p className="subtitle">En ligne</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">100</p>
                                        <p className="subtitle">Comptes</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">59k</p>
                                        <p className="subtitle">Products</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">3.4k</p>
                                        <p className="subtitle">Articles</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">19</p>
                                        <p className="subtitle">Erreurs</p>
                                    </article>
                                </div>
                            </div>
                        </section>
                        <div className="columns">
                            <div className="column is-6">
                                <div className="card events-card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Events
                                        </p>
                                        <a href="#" className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className="fa fa-angle-down" aria-hidden="true" />
                                            </span>
                                        </a>
                                    </header>
                                    <div className="card-table">
                                        <div className="content">
                                            <table className="table is-fullwidth is-striped">
                                                <tbody>
                                                    <tr>
                                                        <td width="5%"><i className="far fa-bell" /></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="5%"><i className="far fa-bell" /></td>
                                                        <td>Lorum ipsum dolem aire</td>
                                                        <td className="level-right"><a className="button is-small is-primary" href="#">Action</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <a href="#" className="card-footer-item">View All</a>
                                    </footer>
                                </div>
                            </div>
                            <div className="column is-6">
                                <div className="card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            Inventory Search
                                        </p>
                                        <a href="#" className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className="fa fa-angle-down" aria-hidden="true" />
                                            </span>
                                        </a>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-large" type="text" placeholder />
                                                <span className="icon is-medium is-left">
                                                    <i className="fa fa-search" />
                                                </span>
                                                <span className="icon is-medium is-right">
                                                    <i className="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            User Search
                                        </p>
                                        <a href="#" className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className="fa fa-angle-down" aria-hidden="true" />
                                            </span>
                                        </a>
                                    </header>
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="control has-icons-left has-icons-right">
                                                <input className="input is-large" type="text" placeholder />
                                                <span className="icon is-medium is-left">
                                                    <i className="fa fa-search" />
                                                </span>
                                                <span className="icon is-medium is-right">
                                                    <i className="fa fa-check" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
