// src/components/RouteList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const RouteList = ({ onSelectRoute }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Erro ao buscar rotas:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="w-full md:w-1/4 p-4">
      <h2 className="text-xl mb-4">Rotas Disponíveis</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {routes.map(route => (
          <li
            key={route.id}
            className="p-2 cursor-pointer hover:bg-blue-200"
            onClick={() => onSelectRoute(route.id)}
          >
            {route.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteList;
