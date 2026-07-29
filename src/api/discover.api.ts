import { apiClient } from './axiosInstance';
import { ENDPOINTS } from './endpoints';
import type { TourSuggestion } from '../types/models';

export async function fetchDiscoverFeed(): Promise<TourSuggestion[]> {
  const { data } = await apiClient.get<TourSuggestion[]>(ENDPOINTS.discoverFeed);
  return data;
}
