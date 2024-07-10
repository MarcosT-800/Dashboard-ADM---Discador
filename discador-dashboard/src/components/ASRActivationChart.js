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
  if (!Array.isArray(asrActivation) || asrActivation.length === 0) {
    return <div>No data available</div>;
  }

  const labels = asrActivation.map(stat => stat.date);
  const totalCalls = asrActivation.map(stat => stat.total);
  const answeredCalls = asrActivation.map(stat => stat.answered);
  const notAnsweredCalls = asrActivation.map(stat => stat.not_answered);
  const failedCalls = asrActivation.map(stat => stat.failed);
  const abandonedCalls = asrActivation.map(stat => stat.abandoned);
  const notAnsweredAMDCalls = asrActivation.map(stat => stat.not_answered_due_progress_amd);
  const abandonedAMDCalls = asrActivation.map(stat => stat.abandoned_due_amd);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Calls',
        data: totalCalls,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Answered Calls',
        data: answeredCalls,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Not Answered Calls',
        data: notAnsweredCalls,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Failed Calls',
        data: failedCalls,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Abandoned Calls',
        data: abandonedCalls,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Not Answered Due to AMD',
        data: notAnsweredAMDCalls,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Abandoned Due to AMD',
        data: abandonedAMDCalls,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
        text: 'ASR Activation Statistics',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Calls',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ minWidth: labels.length * 50 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ASRActivationChart;
