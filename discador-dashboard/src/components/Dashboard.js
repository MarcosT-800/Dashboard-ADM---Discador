import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignPerformanceChart from './CampaignPerformanceChart';
import CallStatusDistributionChart from './CallStatusDistributionChart';
import AgentPerformanceChart from './AgentPerformanceChart';
import AgentActivityChart from './AgentActivityChart';
import CallTypePerformanceChart from './CallTypePerformanceChart';
import ASRActivationChart from './ASRActivationChart';
import LoggedCampaignChart from './LoggedCampaignChart';
import CampaignQualificationsChart from './CampaignQualificationsChart';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [callStats, setCallStats] = useState({
    answered: 0,
    not_answered: 0,
    abandoned: 0,
    failed: 0
  });
  const [agentMetrics, setAgentMetrics] = useState([]);
  const [agentActivity, setAgentActivity] = useState([]);
  const [callTypePerformance, setCallTypePerformance] = useState([]);
  const [asrActivation, setAsrActivation] = useState([]);
  const [loggedCampaign, setLoggedCampaign] = useState({});
  const [campaignQualifications, setCampaignQualifications] = useState([]);

  const token = process.env.REACT_APP_API_TOKEN;

  if (!token) {
    console.error('Token de autenticação não encontrado');
    return null;
  }

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('https://3c.fluxoti.com/api/v1/campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Resposta das campanhas:', response.data);
      setCampaigns(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error.response ? error.response.data : error.message);
      return [];
    }
  };

  const fetchCallStats = async () => {
    try {
      const response = await axios.get('https://3c.fluxoti.com/api/v1/routes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Resposta das estatísticas de chamadas:', response.data);
      setCallStats({
        answered: 100,
        not_answered: 50,
        abandoned: 20,
        failed: 10
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas de chamadas:', error.response ? error.response.data : error.message);
    }
  };

  const fetchAgentMetrics = async (campaignId) => {
    try {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
      const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 23:59:59`;

      console.log('Parâmetros de data (Agent Metrics):', { startDate, endDate });

      const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns/${campaignId}/agents/metrics/total`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log('Resposta das métricas de agentes:', response.data);
      if (Array.isArray(response.data.data)) {
        setAgentMetrics(prevMetrics => [...prevMetrics, ...response.data.data]);
      } else {
        console.error('Dados das métricas de agentes não são um array:', response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar métricas de agentes:', error.response ? error.response.data : error.message);
    }
  };

  const fetchAgentActivity = async (campaignId) => {
    try {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
      const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 23:59:59`;
  
      console.log('Parâmetros de data (Agent Activity):', { startDate, endDate });
  
      const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns/${campaignId}/agents/metrics`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log('Resposta das atividades dos agentes:', response.data);
  
      if (response.data && response.data.data) {
        setAgentActivity(response.data.data);
      } else {
        console.error('Resposta inesperada da API ao buscar atividades dos agentes:', response.data);
        setAgentActivity([]);
      }
    } catch (error) {
      console.error('Erro ao buscar atividades dos agentes:', error.response ? error.response.data : error.message);
    }
  };
  

  const fetchCallTypePerformance = async (campaignId) => {
    try {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
      const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 23:59:59`;

      console.log('Parâmetros de data (Call Type Performance):', { startDate, endDate });

      const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns/${campaignId}/calls`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log('Resposta do desempenho por tipo de chamada:', response.data);
      setCallTypePerformance(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar desempenho por tipo de chamada:', error.response ? error.response.data : error.message);
    }
  };

  const fetchAsrActivation = async (campaignId) => {
    try {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
      const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 23:59:59`;

      console.log('Parâmetros de data (ASR Activation):', { startDate, endDate });

      const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns/${campaignId}/statistics`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log('Resposta da ativação de ASR:', response.data);
      setAsrActivation(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar ativação de ASR:', error.response ? error.response.data : error.message);
    }
  };

  const fetchLoggedCampaign = async () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 9 && currentHour <= 17) {
      try {
        const response = await axios.get('https://3c.fluxoti.com/api/v1/agent/loggedCampaign', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Resposta da campanha logada:', response.data);
        setLoggedCampaign(response.data);
      } catch (error) {
        console.error('Erro ao buscar campanha logada:', error.response ? error.response.data : error.message);
      }
    } else {
      console.log('Agentes não estão logados fora do horário de expediente.');
    }
  };

  const fetchCampaignQualifications = async (campaignId) => {
    try {
      const today = new Date();
      const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
      const endDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 23:59:59`;

      console.log('Parâmetros de data (Campaign Qualifications):', { startDate, endDate });

      const response = await axios.get(`https://3c.fluxoti.com/api/v1/campaigns/${campaignId}/qualifications/total`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log('Resposta das qualificações das campanhas:', response.data);
      setCampaignQualifications(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar qualificações das campanhas:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      const campaigns = await fetchCampaigns();
      if (campaigns.length > 0) {
        const campaignId = campaigns[0].id;
        await fetchAgentMetrics(campaignId);
        await fetchAgentActivity(campaignId);
        await fetchCallTypePerformance(campaignId);
        await fetchAsrActivation(campaignId);
        await fetchCampaignQualifications(campaignId);
      }
      await fetchCallStats();
      await fetchLoggedCampaign();
    };

    initializeDashboard();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <CampaignPerformanceChart campaigns={campaigns} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <CallStatusDistributionChart callStats={callStats} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <AgentPerformanceChart agentMetrics={agentMetrics} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <AgentActivityChart agentActivity={agentActivity} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <CallTypePerformanceChart callTypePerformance={callTypePerformance} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ASRActivationChart asrActivation={asrActivation} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <LoggedCampaignChart loggedCampaign={loggedCampaign} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <CampaignQualificationsChart campaignQualifications={campaignQualifications} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
