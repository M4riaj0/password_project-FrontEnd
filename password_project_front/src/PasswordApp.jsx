import React, { useEffect } from 'react';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import './styles.css';


const PasswordApp = () => {
  useEffect(() => {
    fetch('http://127.0.0.1:8000', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, [])
  return (
    <AppTheme>  
        <AppRouter  />
    </AppTheme>
  );
}

export default PasswordApp
