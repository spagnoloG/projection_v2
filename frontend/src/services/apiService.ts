import axios from 'axios';
import {
  Lyric,
  LyricPost,
  RawLyric,
  LyricCategory,
  LyricCategoryPost,
  LyricsResponse,
  LyricCategoriesResponse,
} from '../types';

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

function parseLyricContent(lyric: RawLyric): Lyric {
  return {
    ...lyric,
    content: JSON.parse(lyric.content),
  };
}

export const FetchLyrics = async (): Promise<Lyric[]> => {
  try {
    const response = await apiClient.get<LyricsResponse>('/lyrics');
    return response.data.lyrics;
  } catch (error) {
    throw new Error('Failed to fetch lyrics');
  }
};

export const FetchLyricById = async (id: string): Promise<Lyric> => {
  try {
    const response = await apiClient.get<{ lyric: RawLyric[] }>(`/lyrics/${id}`);
    const rawLyric = response.data.lyric[0];
    return parseLyricContent(rawLyric);
  } catch (error) {
    throw new Error(`Failed to fetch lyric with ID: ${id}`);
  }
};

export const PatchLyric = async (id: string, lyric: LyricPost): Promise<Lyric> => {
  try {
    const response = await apiClient.patch<Lyric>(`/lyrics/${id}`, lyric);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to patch lyric with ID: ${id}`);
  }
};

export const DeleteLyric = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/lyrics/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete lyric with ID: ${id}`);
  }
};

export const PostLyric = async (lyric: LyricPost): Promise<Lyric> => {
  try {
    const response = await apiClient.post<Lyric>('/lyrics', lyric);
    return response.data;
  } catch (error) {
    throw new Error('Failed to post lyric');
  }
};

export const FetchLyricCategories = async (): Promise<LyricCategory[]> => {
  try {
    const response = await apiClient.get<LyricCategoriesResponse>('/lyricsc');
    return response.data.categories;
  } catch (error) {
    throw new Error('Failed to fetch lyric categories');
  }
};

export const CreateLyricCategory = async (category: LyricCategoryPost): Promise<void> => {
  try {
    await apiClient.post('/lyricsc', category);
  } catch (error) {
    throw new Error('Failed to create lyric category');
  }
};

export const DeleteLyricCategory = async (categoryName: string): Promise<void> => {
  try {
    await apiClient.delete(`/lyricsc/${categoryName}`);
  } catch (error) {
    throw new Error(`Failed to delete lyric category with name: ${categoryName}`);
  }
};
