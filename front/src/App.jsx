import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Signin, Signup, Profile, Admin } from './containers';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('token');
        document.location.href = '/';
    }, []);
    return (
        <div>Déconnexion en cours</div>
    );
};

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/admin" exact component={Admin} />
            </Switch>
        </Router>
    );
};

export default App;
