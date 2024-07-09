import React from 'react';
import { Bar } from 'react-chartjs-2';

const CallTypePerformanceChart = ({ callTypePerformance }) => {
  if (!Array.isArray(callTypePerformance) || callTypePerformance.length === 0) {
    return <p>No data available</p>;
  }

  const data = {
    labels: callTypePerformance.map(performance => performance.type),
    datasets: [
      {
        label: 'Calls',
        data: callTypePerformance.map(performance => performance.calls),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Manual Calls',
        data: callTypePerformance.map(performance => performance.manual_calls),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default CallTypePerformanceChart;
