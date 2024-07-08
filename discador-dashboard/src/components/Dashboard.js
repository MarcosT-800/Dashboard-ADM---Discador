import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('https://3c.fluxoti.com/api/v1/routes', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        });
        setRoutes(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(`Erro ao buscar as rotas: ${error.message}`);
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const data = {
    labels: routes.map(route => route.name),
    datasets: [
      {
        label: 'Cadence',
        data: routes.map(route => route['telephony-rates'][0].cadence),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {routes.map(route => (
          <div key={route.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{route.name}</h2>
            <p className="text-gray-700">Endpoint: {route.endpoint}</p>
            <p className="text-gray-700">Route: {route.route}</p>
            <p className="text-gray-700">Uses Country Code: {route.uses_country_code ? 'Yes' : 'No'}</p>
            <p className="text-gray-700">Allow Mobile: {route.allow_mobile ? 'Yes' : 'No'}</p>
            <p className="text-gray-700">Allow Landline: {route.allow_landline ? 'Yes' : 'No'}</p>
            <h3 className="text-lg font-semibold mt-2">Telephony Rates:</h3>
            {route['telephony-rates'].map(rate => (
              <div key={rate.id} className="bg-gray-100 p-2 rounded mt-1">
                <p className="text-gray-700">Minimum Duration: {rate.minimum_duration}</p>
                <p className="text-gray-700">Minimum Duration Charged: {rate.minimum_duration_charged}</p>
                <p className="text-gray-700">Cadence: {rate.cadence}</p>
                <p className="text-gray-700">Type: {rate.type}</p>
                <p className="text-gray-700">Value: {rate.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-xl font-semibold mb-2">Cadence per Route</h2>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
