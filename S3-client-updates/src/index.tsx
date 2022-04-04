import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './scss/index.scss';
import App from './components/App';
import AppContext from './lib/context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext.Provider value={{}}>
      <App />
      </AppContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
