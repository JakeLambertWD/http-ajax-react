import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// this gets our request
axios.interceptors.request.use(request => {
    console.log(request)
    return request;
}, error => {
    console.log(error);
    return Promise.eject(error);
});

// this gets our response 
axios.interceptors.response.use(response => {
    console.log(response)
    return response;
}, error => {
    console.log(error);
    return Promise.eject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
