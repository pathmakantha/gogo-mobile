export const ENDPOINTS = {
  discoverFeed: '/discover/feed',
  trips: '/trips',
  trip: (id: string) => `/trips/${id}`,
  expenses: (tripId: string) => `/trips/${tripId}/expenses`,
} as const;
