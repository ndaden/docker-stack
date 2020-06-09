import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as cmsutils from './cms.utils';


const PageWrapper = ({ id, title, areas, editMode }) => {
    return () => {
        useEffect(() => {
            document.title = title;
        }, []);
        return (
        <React.Fragment>
        {editMode && <div className="content is-marginless has-background-black has-text-white is-small">{title} - {id}</div>}
        <div className="container is-fluid">
            {areas.map((area) => {
                return (
                    <React.Fragment key={area._id}>
                    {editMode && <div className="content is-marginless has-background-black has-text-white is-small">{area.name} [{area.type}] ({area._id})</div>}
                    <div className="" style={{ border: '1px solid black' }}>
                        {area.content.map((ctn) => {
                            return (<span key={ctn._id}>{ctn.value}</span>);
                        })}
                       {editMode &&
                        (
                        <div className="buttons are-small has-addons">
                        <button className="button is-info">Ajouter un contenu dans {area.name}</button>
                        <button className="button is-info">Créer une zone dans {area.name}</button>
                        <button className="button is-danger">Supprimer {area.name}</button>
                        </div>
                        )}
                    </div>
                    </React.Fragment>
                );
            })}
            {editMode && <div><button className="button is-small">Créer une nouvelle zone</button></div>}
        </div>
        </React.Fragment>
    );
}
};

const CmsCore = ({ match: { path } }) => {
    const [site, setSite] = useState({});

    useEffect(() => {
        async function initSite() {
            setSite(await cmsutils.getSite('monsite'));
        }

        initSite();
    }, []);

    return site.data !== undefined
    && (
        <Router>
            {console.log(site.data)}
            <div className="has-background-grey-light">
            <h1 className="title">Bienvenue sur {site.data.name} <span className="content is-marginless is-small">{site.data._id}</span></h1>
            <div className="select is-small is-primary">
            <select onChange={(e) => { window.location = e.target.value; }} value={window.location.pathname}>
            <option value="">-- selectionner une page --</option>
            {site.data.pages.map((page) => {
                return (<option key={page._id} value={`${path}${page.route}`}>{page.route}</option>);
             })}
            </select>
            </div>
            </div>
            <div id="site-container">
            <Switch>
            {site.data.pages.map((page) => {
                return (<Route key={page._id} path={`${path}${page.route}`} component={PageWrapper({ id: page._id, title: page.title, areas: page.areas, editMode: true })} exact />);
            })}
            </Switch>
            </div>
        </Router>
        );
};

export default CmsCore;
