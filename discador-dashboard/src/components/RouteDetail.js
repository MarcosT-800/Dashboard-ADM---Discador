// src/components/RouteDetail.js
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../services/api';

const RouteDetail = ({ routeId }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/routes/${routeId}/hangupCauseReport`, {
          params: { startDate: '2023-01-01', endDate: '2023-01-31', interval: 1, phoneType: 'all' },
        });
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes da rota:', error);
        setLoading(false);
      }
    };

    if (routeId) {
      fetchDetails();
    }
  }, [routeId]);

  return (
    <div className="w-full md:w-3/4 p-4">
      <h2 className="text-xl mb-4">Detalhes da Rota</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <LineChart width={600} height={300} data={details}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="success" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </div>
  );
};

export default RouteDetail;
