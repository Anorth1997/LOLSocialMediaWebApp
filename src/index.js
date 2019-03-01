import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import promiseMiddleware from 'redux-promise'; 
import Routes from './routes';

import reducers from './reducers/index';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>, 
    document.querySelector('#root')
);