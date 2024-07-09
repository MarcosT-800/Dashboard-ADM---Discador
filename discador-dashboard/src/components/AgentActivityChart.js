import React from 'react';
import { Bar } from 'react-chartjs-2';

const AgentActivityChart = ({ agentActivity }) => {
  if (!Array.isArray(agentActivity) || agentActivity.length === 0) {
    return <p>No data available</p>;
  }

  const data = {
    labels: agentActivity.map(activity => activity.agent.name),
    datasets: [
      {
        label: 'Active Time',
        data: agentActivity.map(activity => activity.active_time),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Inactive Time',
        data: agentActivity.map(activity => activity.inactive_time),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default AgentActivityChart;
