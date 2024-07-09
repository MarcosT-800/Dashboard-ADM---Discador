import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ASRActivationChart = ({ asrActivation }) => {
  if (!Array.isArray(asrActivation)) {
    return <div>No data available</div>;
  }

  const labels = asrActivation.map(stat => stat.label);  // Ajuste conforme os dados recebidos
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'ASR Activation',
        data: asrActivation.map(stat => stat.value),  // Ajuste conforme os dados recebidos
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ASR Activation',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ASRActivationChart;
