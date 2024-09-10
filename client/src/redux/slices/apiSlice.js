import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for the API requests
const API_BASE_URL = "http://localhost:8800/api";

// Custom base query function
const customBaseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL });

export const apiService = createApi({
  reducerPath: 'apiService', // Define a custom reducer path
  baseQuery: customBaseQuery,
  tagTypes: [], // Can be used for cache invalidation
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});