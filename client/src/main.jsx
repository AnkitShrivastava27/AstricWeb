import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#FAFAF8',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            borderRadius: '10px',
            border: '1px solid rgba(200,169,110,0.25)',
          },
          success: { iconTheme: { primary: '#C8A96E', secondary: '#1A1A1A' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
