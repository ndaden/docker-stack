import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { AdminContextProvider, AdminContextConsumer } from '../../providers/AdministrationContextProvider';
import AdminUsers from './AdminUsers';

const AdminIndex = ({ match: { path } }) => {
    console.log("Admin index:", path);
    return (
        <AdminContextProvider>
            <AdminContextConsumer>
                {props => (
                    <Router>
                        <Switch>
                            <Route path={`${path}/users`} exact component={AdminUsers} />
                        </Switch>
                    </Router>)}
            </AdminContextConsumer>
        </AdminContextProvider>
    );
};

export default AdminIndex;