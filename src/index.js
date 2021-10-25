import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import Layout from './components/Layout'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './sass/index.scss'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/boxicons-2.0.7/css/error-page.css'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
