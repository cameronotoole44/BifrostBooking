import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import CurrentUserProvider from './contexts/CurrentUser';

ReactDOM.render(
    <Provider store={store}>
        <CurrentUserProvider>
            <App />
        </CurrentUserProvider>
    </Provider>,
    document.getElementById('root')
);