import React from 'react';

const Summary = ({ data }) => {
    return (
       <>
            <h2>Récapitulatif des données saisies :</h2>
            <pre>
                {JSON.stringify(data)}
            </pre>
       </>
    );
};

export default Summary;