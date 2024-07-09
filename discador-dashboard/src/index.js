// src/index.js
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AgentActivityChart from './components/AgentActivityChart';
import CallTypePerformanceChart from './components/CallTypePerformanceChart';
import ASRActivationChart from './components/ASRActivationChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>Carregando...</div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
