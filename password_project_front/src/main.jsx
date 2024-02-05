import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import PasswordApp from './PasswordApp';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PasswordApp />
    </BrowserRouter>
  </React.StrictMode>,
)
