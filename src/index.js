import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <GoogleOAuthProvider clientId="........CLIENT ID ......">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
