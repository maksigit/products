import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {rPosts} from "./reducers/Reducers";
import {createStore} from 'redux';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'

import './index.css';

import FormLogin from './components/FormLogin';
import Products from './components/Products';
import App from './components/App';
import Links from './components/Links';


const store = createStore(rPosts);
console.log('MyStore =>', store);
console.log('MyTestStore =>', store.testStore);
console.log('GetStore =>', store.getState());


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Links/>
                <Route exact path="/" component={App}/>
                <Route exact path="/login/" component={FormLogin}/>
                <Route exact path="/products/" component={Products}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

