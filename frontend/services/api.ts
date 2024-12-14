import axios from 'axios';

const API_URL = 'https://doon-assignment-b2-hb0pbe0km-tanujs-projects-ca8ac3a9.vercel.app/?vercelToolbarCode=gxRQXxBc9UnpaZx';
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/api/signin', { username, password });
  return response.data;
};

export const getCards = async () => {
  const response = await api.get('/api/courses');
  return response.data;
};

export const createCard = async (cardData: any) => {
  const response = await api.post('/api/admin/courses', cardData);
  return response.data;
};

export const updateCard = async (id: string, cardData: any) => {
  const response = await api.put(`/api/admin/courses/${id}`, cardData);
  return response.data;
};

export const deleteCard = async (id: string) => {
  const response = await api.delete(`/api/admin/courses/${id}`);
  return response.data;
};

