import React from 'react';
import { Pie } from 'react-chartjs-2';

const LoggedCampaignChart = ({ loggedCampaign }) => {
  if (!loggedCampaign || !loggedCampaign.company) {
    return <p>No data available</p>;
  }

  const data = {
    labels: ['Active Time', 'Idle Time'],
    datasets: [
      {
        data: [loggedCampaign.is_on_active_time ? 1 : 0, loggedCampaign.is_on_active_time ? 0 : 1],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)']
      }
    ]
  };

  return (
    <div>
      <h2>Logged Campaign: {loggedCampaign.name}</h2>
      <Pie data={data} />
    </div>
  );
};

export default LoggedCampaignChart;
