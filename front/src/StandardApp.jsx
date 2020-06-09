import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
    ElasticTool,
    NavBar,
    Home,
    SignIn,
    SignUp,
    SignOut,
    EditPasswordForm,
    Profile,
    Footer,
    Error404,
    TechnicalError,
    ActivationForm,
    ProtectedRoute,
    AdminIndex,
} from './components';
import Stepper from './components/Tunnel/Stepper';
import { UserContext } from './providers/UserContextProvider';
import CmsCore from './components/Cms/CmsCore';

const StandardApp = () => {
    const userContext = useContext(UserContext);
    const { isLoading, user } = userContext;
    user.checkAuth();
    if (isLoading) {
        return <h1>Loading... if the page does not display, please Reload</h1>;
    }
    return (
        <Router>
            <NavBar />
            <section id="main" className="section">
            <Switch>
            <ProtectedRoute path="/elastictool" exact component={ElasticTool} checkActive rejectMessage="Vous devez avoir un compte actif pour acceder à cette page. pour cela saisissez le code envoyé par e-mail." />
            <Route path="/tunnel" exact component={Stepper} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <ProtectedRoute path="/password" exact component={EditPasswordForm} />
            <ProtectedRoute path="/profile" exact component={Profile} />
            <Route path="/activate" exact component={ActivationForm} />
            <Route path="/logout" exact component={SignOut} />
            <Route path="/error" exact component={TechnicalError} />
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/admin" component={AdminIndex} checkRole="ADMINISTRATOR" />
            <Route path="/cms" component={CmsCore} />
            <Route component={Error404} />
            </Switch>
            </section>
            <Footer />
        </Router>
    );
};

export default StandardApp;
