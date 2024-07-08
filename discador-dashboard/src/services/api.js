import axios from 'axios';

// Crie uma instância do axios
const api = axios.create({
  baseURL: 'https://3c.fluxoti.com/api/v1',
});

// Adicione um interceptor para incluir o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = 'd0NLCpTnvtsY1gQu7S38RyF47fOjnHknynBjGzWxCwpXOJqXaNwWDrGqFomq'; // Substitua 'SEU_TOKEN_AQUI' pelo seu token de autenticação
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
