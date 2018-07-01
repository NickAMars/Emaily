import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers'; // goes to reducers/index.js
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(thunk));

//do not put any spacing between the provider tags
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
   document.querySelector('#root')
);
