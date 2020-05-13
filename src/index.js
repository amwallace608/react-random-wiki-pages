import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Api'

ReactDOM.render(
  <div>
    <h5>Your random Wikipedia pages are:</h5>
    <App />
  </div>,
  document.getElementById('root')
);

