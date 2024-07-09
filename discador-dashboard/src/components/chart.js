import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  // Registra os componentes necessários
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const Chart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Cadence',
        data: data.map(item => item['telephony-rates'][0].cadence),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
