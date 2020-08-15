import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StandardApp from './StandardApp';
import CmsCore from './components/Cms/CmsCore';

const App = () => {
    return (
        <Router>
            <Switch>
            <Route path="/" component={StandardApp} />
            <Route path="/cms" component={CmsCore} />
            </Switch>
        </Router>
    );
};

export default App;
