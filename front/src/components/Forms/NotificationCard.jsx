import React, { useState } from 'react';

const NotificationCard = ({ type, title, body, className }) => {
    const [show, setShow] = useState(true);
    return show && (
        <article className={`message ${type === 'success' ? 'is-success' : 'is-danger'} ${className}`}>
            <div className="message-header">
                <p>{title}</p>
                <button className="delete" onClick={() => setShow(false)}> </button>
            </div>
            <div className="message-body">
                {body}
            </div>
        </article>
    );
};

export default NotificationCard;
