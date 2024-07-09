import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CampaignPerformanceChart = ({ campaigns }) => {
  const chartData = {
    labels: campaigns.map(campaign => campaign.name),
    datasets: [
      {
        label: 'ASR',
        data: campaigns.map(campaign => campaign.asr),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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
        text: 'Desempenho das Campanhas (ASR)',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CampaignPerformanceChart;
