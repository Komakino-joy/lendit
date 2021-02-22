import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor} from './redux/store';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// optional configuration for alerts
const options = {
  position: positions.TOP_RIGHT,
  timeout: 3000,
  offset: '1em',
  transition: transitions.FADE,
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
