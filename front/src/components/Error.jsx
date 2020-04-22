import React from 'react';

const TechnicalError = () => {
  return (
    <div className="hero-body">

      <span className="icon is-large">
        <i className="fas fa-3x fa-code"> </i>
      </span>
      <h1 className="title">
        Erreur technique
            </h1>
      <h2 className="subtitle">
        Nous rencontrons actuellement un problème technique
            </h2>
    </div>
  );
};

const Error404 = () => {
  return (
      <div className="hero-body">
          <span className="icon is-large">
            <i className="fas fa-3x fa-frown"> </i>
          </span>
          <h1 className="title">
            ...Désolé
          </h1>
          <h2 className="subtitle">
            Cette page n&apos;existe pas. (Erreur 404)
          </h2>
      </div>
  );
};

export { Error404, TechnicalError };
