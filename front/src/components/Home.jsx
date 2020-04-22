import React from 'react';
import Card from './Card';

const Home = () => {
    return (
        <div className="container is-fluid">
            <h1 className="title">Bienvenue sur mon appli React</h1>
            <div className="columns">
                <div className="column">
                    <div className="content">
                        <Card />
                    </div>
                    <div className="content">
                        <Card />
                    </div>
                    <div className="content">
                        <Card />
                    </div>
                    <div className="content">
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
