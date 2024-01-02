import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './scss/main.scss';
import { AppProvider } from './contexts/appContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
