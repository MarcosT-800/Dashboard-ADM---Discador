import React from 'react';
import { Bar } from 'react-chartjs-2';

const CampaignQualificationsChart = ({ campaignQualifications }) => {
  // Certifique-se de que campaignQualifications é um objeto com a propriedade qualifications
  const qualifications = campaignQualifications.qualifications || {};

  // Transformar o objeto qualifications em um array de qualificações
  const qualificationsArray = Object.values(qualifications);

  // Log para depuração
  console.log('Qualificações das Campanhas:', qualificationsArray);

  const data = {
    labels: qualificationsArray.map(q => q.name),
    datasets: [
      {
        label: 'Qualificações',
        data: qualificationsArray.map(q => q.total),
        backgroundColor: qualificationsArray.map(q => q.color || 'rgba(75, 192, 192, 0.6)')
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Qualificações das Campanhas</h2>
      {qualificationsArray.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CampaignQualificationsChart;
