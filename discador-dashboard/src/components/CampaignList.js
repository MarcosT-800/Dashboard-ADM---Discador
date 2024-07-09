import React from 'react';

const CampaignList = ({ campaigns }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Lista de Campanhas</h2>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{campaign.name}</h3>
            <p className="text-gray-700">Start Time: {campaign.start_time}</p>
            <p className="text-gray-700">End Time: {campaign.end_time}</p>
            <p className="text-gray-700">Paused: {campaign.paused ? 'Yes' : 'No'}</p>
            <p className="text-gray-700">ASR: {campaign.asr}</p>
            <p className="text-gray-700">AMD Enabled: {campaign.amd_enabled ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
