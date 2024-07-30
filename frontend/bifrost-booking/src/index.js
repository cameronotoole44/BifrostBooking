import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import CurrentUserProvider from './contexts/CurrentUser';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <CurrentUserProvider>
            <App />
        </CurrentUserProvider>
    </Provider>
);