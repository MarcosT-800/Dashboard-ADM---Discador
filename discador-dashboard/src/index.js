// src/index.js
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>Carregando...</div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
