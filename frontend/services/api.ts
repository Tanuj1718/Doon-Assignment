import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://doon-assignment-h26u-30an386rl-tanujs-projects-ca8ac3a9.vercel.app/?vercelToolbarCode=uUMUfzMiHjkdUFt/api';
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/signin', { username, password });
  return response.data;
};

export const getCards = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const createCard = async (cardData: any) => {
  const response = await api.post('/admin/courses', cardData);
  return response.data;
};

export const updateCard = async (id: string, cardData: any) => {
  const response = await api.put(`/admin/courses/${id}`, cardData);
  return response.data;
};

export const deleteCard = async (id: string) => {
  const response = await api.delete(`/admin/courses/${id}`);
  return response.data;
};

