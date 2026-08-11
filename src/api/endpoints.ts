// Paths mirror GoGo-Api's real Express routes (src/routes/*.routes.js), mounted as:
//   /auth   -> authRoutes   (behind Firebase ID-token verification)
//   /user   -> userRoutes   (behind backend session auth)
//   /trips  -> tripRoutes   (behind backend session auth)
//   /tours  -> tourRoutes   (behind backend session auth) -- this IS the discover feed
export const ENDPOINTS = {
  // auth
  signUp: '/auth/sign-up',
  verifyOtp: '/auth/verify-otp',
  resendOtp: '/auth/resend-otp',
  signIn: '/auth/sign-in',

  // user
  userDetails: '/user/user-details',
  updateProfile: '/user/profile',

  // discover / tours (was '/discover/feed' - that route doesn't exist on the API;
  // the real discover feed is GET /tours)
  discoverFeed: '/tours',
  tour: (id: string) => `/tours/${id}`,
  toggleFavorite: (id: string) => `/tours/${id}/favorite`,
  myFavorites: '/tours/favorites/mine',

  // trips
  trips: '/trips',
  trip: (id: string) => `/trips/${id}`,
  updateItinerary: (id: string) => `/trips/${id}/itinerary`,
  participants: (tripId: string) => `/trips/${tripId}/participants`,
  removeParticipant: (tripId: string, participantId: string) =>
    `/trips/${tripId}/participants/${participantId}`,
  expenses: (tripId: string) => `/trips/${tripId}/expenses`,
  deleteExpense: (tripId: string, expenseId: string) =>
    `/trips/${tripId}/expenses/${expenseId}`,
  budgetSummary: (tripId: string) => `/trips/${tripId}/budget`,
  settleUp: (tripId: string) => `/trips/${tripId}/settle-up`,
} as const;
