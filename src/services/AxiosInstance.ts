import axios, { AxiosError } from 'axios';
import rootConfig from '@/config';

const axiosInstance = axios.create({
  baseURL: rootConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for API key
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    "api-key": rootConfig.apiKey,
  };
  return config;
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle API errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const data = error.response.data;
      
      // Handle specific error codes
      switch (status) {
        case 400:
          console.error('Bad request:', data);
          throw new Error('Invalid request parameters');
        case 401:
          console.error('Unauthorized:', data);
          throw new Error('API key is invalid or missing');
        case 404:
          console.error('Not found:', data);
          throw new Error('The requested resource was not found');
        case 429:
          console.error('Too many requests:', data);
          throw new Error('Rate limit exceeded. Please try again later');
        case 500:
          console.error('Server error:', data);
          throw new Error('The New York Times API is experiencing issues');
        default:
          console.error(`Error ${status}:`, data);
          throw new Error(`API error: ${status}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from the server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

export default axiosInstance;