// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen mx-auto items-center">
      <div className='w-full'>
      <Header />
      </div>
      <div className="container mx-auto p-4">
         <Dashboard /> 
      </div>
    </div>
    </>
  );
}

export default App;
