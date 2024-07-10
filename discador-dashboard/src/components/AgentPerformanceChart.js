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
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const AgentPerformanceChart = ({ agentPerformance }) => {
  if (!Array.isArray(agentPerformance) || agentPerformance.length === 0) {
    return <div>No data available</div>;
  }

  const labels = agentPerformance.map(a => a.agent.name);
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
      {
        label: 'Speaking Time',
        data: agentPerformance.map(a => a.speaking_time),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Idle Time',
        data: agentPerformance.map(a => a.idle_time),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AgentPerformanceChart;
