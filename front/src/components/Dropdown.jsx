import React, { useRef, useEffect } from 'react';

const Dropdown = ({ children }) => {
    const node = useRef();
    const openDropdown = (e) => {
        node.current.classList.add('is-active');
    };

    const closeDropdown = (e) => {
        node.current.classList.remove('is-active');
    };
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside click
            openDropdown(e);
            return;
        }
        // outside click 
        console.log('you clicked outside !');
        closeDropdown(e);
    };
    return (
        <div className="dropdown" ref={node}>
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={(e) => handleClick(e)}>
                    <span>Actions</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            {children}
        </div>);
};

export default Dropdown;