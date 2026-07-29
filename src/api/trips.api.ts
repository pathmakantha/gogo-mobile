import { apiClient } from './axiosInstance';
import { ENDPOINTS } from './endpoints';
import type { Trip } from '../types/models';

export async function fetchTrips(): Promise<Trip[]> {
  const { data } = await apiClient.get<Trip[]>(ENDPOINTS.trips);
  return data;
}

export async function fetchTrip(id: string): Promise<Trip> {
  const { data } = await apiClient.get<Trip>(ENDPOINTS.trip(id));
  return data;
}
