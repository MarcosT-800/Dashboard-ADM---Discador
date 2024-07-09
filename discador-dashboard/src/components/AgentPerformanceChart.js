import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AgentPerformanceChart = ({ agentPerformance }) => {
  if (!Array.isArray(agentPerformance)) {
    return <div>No data available</div>;
  }

  const labels = agentPerformance.map(a => a.name);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Calls',
        data: agentPerformance.map(a => a.total_calls),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
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
        text: 'Agent Performance Metrics',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AgentPerformanceChart;
