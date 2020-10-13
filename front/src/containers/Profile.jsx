import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useAuthentification from '../hooks/useAuthentification';
import { changeProfilePicture } from '../services/main.service';
import { NavbarDefault, ProfileInformationDefault } from '../components';

const Profile = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [currentTab, setCurrentTab] = useState('informations');
    const [refresh, setRefresh] = useState(0);

    const isActiveTab = (name) => {
        return name === currentTab ? 'is-active' : '';
    };
    const authenticationState = useAuthentification(refresh);
    useEffect(() => {
        console.log(authenticationState);
        if (authenticationState && authenticationState.isAuthenticated === false) {
            document.location.href = '/';
        }
    }, []);

    const onSelectAvatar = async (e) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        const result = await changeProfilePicture(formData);
        if (result.success) {
            setRefresh(refresh + 1);
        }
    };

    return (
        <React.Fragment>
            {authenticationState && authenticationState.isAuthenticated
                && (
                    <React.Fragment>
                        <NavbarDefault currentPage="" isAuthenticated={authenticationState.isAuthenticated} />
                        <div>
                            <div className="hero is-dark profile-cover">
                                <div className="hero-body has-text-centered-desktop is-flex-touch">
                                    {/* MOBILE */}
                                    <div className="is-hidden-desktop mr-3">
                                        <figure className="image is-96x96">
                                            {authenticationState.data.avatarUrl && <img className="is-rounded" src={authenticationState.data.avatarUrl} alt={authenticationState.data.username} />}
                                            {!authenticationState.data.avatarUrl && <img className="is-rounded" src="https://tplcdn.s3.eu-west-3.amazonaws.com/userAvatar/placeholder.jpg" alt={authenticationState.data.username} />}
                                        </figure>
                                    </div>
                                    <div>
                                        <div className="title">{authenticationState.data.username}</div>
                                        <div className="subtitle">{authenticationState.data.email}</div>
                                    </div>
                                    <button className="button is-link is-outlined is-inverted is-pulled-right is-hidden-touch">Modifier la couverture</button>
                                    <div style={{ position: 'absolute', top: '14rem', left: '50%', marginLeft: '-64px' }} className="is-hidden-touch">
                                        <figure className="image is-128x128 darken">
                                            {authenticationState.data.avatarUrl && <img className="show-on-hover is-rounded" src={authenticationState.data.avatarUrl} alt={authenticationState.data.username} />}
                                            {!authenticationState.data.avatarUrl && <img className="show-on-hover is-rounded" src="https://tplcdn.s3.eu-west-3.amazonaws.com/userAvatar/placeholder.jpg" alt={authenticationState.data.username} />}
                                            <form className="show-on-hover is-hidden">
                                                <div className="file" style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-60px', marginTop: '-10px' }} onChange={e => onSelectAvatar(e)}>
                                                    <label className="file-label">
                                                        <input className="file-input" type="file" ref={register({ required: true })} name="profilPicture" />
                                                        <span className="file-cta">
                                                            <span className="file-icon">
                                                                <i className="fas fa-upload" />
                                                            </span>
                                                            <span className="file-label">
                                                                Changer...
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </form>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div className="is-hidden-touch" style={{ height: '6rem' }} />
                            <div className="tabs is-centered is-boxed is-large mb-0">
                                <ul>
                                    <li className={isActiveTab('informations')}>
                                        <a role="button" onClick={() => setCurrentTab('informations')}>
                                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true" /></span>
                                            <span>Informations</span>
                                        </a>
                                    </li>
                                    <li className={isActiveTab('activites')}>
                                        <a role="button" onClick={() => setCurrentTab('activites')}>
                                            <span className="icon is-small"><i className="fas fa-music" aria-hidden="true" /></span>
                                            <span>Activités</span>
                                        </a>
                                    </li>
                                    <li className={isActiveTab('connexions')}>
                                        <a role="button" onClick={() => setCurrentTab('connexions')}>
                                            <span className="icon is-small"><i className="fas fa-film" aria-hidden="true" /></span>
                                            <span>Connexions</span>
                                        </a>
                                    </li>
                                    <li className={isActiveTab('parametres')}>
                                        <a role="button" onClick={() => setCurrentTab('parametres')}>
                                            <span className="icon is-small"><i className="far fa-file-alt" aria-hidden="true" /></span>
                                            <span>Paramètres</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <section>
                                {currentTab === 'informations' && <ProfileInformationDefault {...authenticationState.data} />}
                            </section>
                        </div>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
};

export default Profile;
