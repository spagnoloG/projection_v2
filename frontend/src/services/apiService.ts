import axios from 'axios';
import { Lyric } from '../types';

const API_BASE_URL = 'http://localhost:4200/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`Request to ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);

export const FetchLyrics = async (): Promise<Lyric[]> => {
  try {
    const response = await apiClient.get('/lyrics');
    return response.data.lyrics;
  } catch (error) {
    throw new Error('Failed to fetch lyrics');
  }
};

export const FetchLyricById = async (id: string) => {
  try {
    const response = await apiClient.get(`/lyrics/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch item with ID: ${id}`);
  }
};
