import React from 'react';
import { Bar } from 'react-chartjs-2';

const AgentActivityChart = ({ agentActivity }) => {
  if (!agentActivity || agentActivity.length === 0) {
    return <p>Nenhuma atividade de agente disponível</p>;
  }

  const labels = agentActivity.map((activity) => activity.agent.name);
  const speakingTimes = agentActivity.map((activity) => parseFloat(activity.speaking.replace(':', '.')));
  const idleTimes = agentActivity.map((activity) => parseFloat(activity.idle.replace(':', '.')));

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tempo de Fala',
        data: speakingTimes,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Tempo Ocioso',
        data: idleTimes,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ minWidth: labels.length * 100 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AgentActivityChart;
