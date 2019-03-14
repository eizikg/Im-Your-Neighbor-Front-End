import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducer from './reducers/login'
import { createStore } from "redux";
import App from './App';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'


const store = createStore(
   reducer, {IsLoggedIn: false}
+ window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 );



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <App/>
    </Provider>
  </BrowserRouter>,
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
