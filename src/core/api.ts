// client/src/core/api.ts

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in every request
api.interceptors.request.use(
  (config) => {
    try {
      const userItem = localStorage.getItem('user'); // The key for our auth store
      
      if (userItem) {
        // Parse the entire persisted store object
        const persistedState = JSON.parse(userItem);

        // --- THIS IS THE CRITICAL FIX ---
        // Navigate through the state object to find the actual user token
        const token = persistedState?.state?.user?.token;

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (error) {
        console.error("Could not parse user from localStorage or attach token", error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;