import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux";
import { store} from './redux/store';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './index.css';
import App from './App';

// optional configuration for alerts
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '1em',
  transition: transitions.FADE,
  containerStyle: {
    zIndex: 10000,
  }
  
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);
