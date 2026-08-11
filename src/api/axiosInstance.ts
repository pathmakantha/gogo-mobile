import axios from 'axios';
import { firebaseAuth } from '../config/firebase';
import { API_BASE_URL } from '../config/env';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use(async config => {
  const currentUser = firebaseAuth?.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
