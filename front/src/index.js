import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import App from './App';
import './style.scss';
import { UserContextProvider, UserContextConsumer } from './providers/UserContextProvider';

const render = (Component) => {
    ReactDOM.render(
        <UserContextProvider>
            <UserContextConsumer>
            { props => (
                <Provider store={configureStore()}>
                    <Component {...props} />
                </Provider>
                )
            }
            </UserContextConsumer>
        </UserContextProvider>,
        document.getElementById('root'),
        );
};

render(App);
