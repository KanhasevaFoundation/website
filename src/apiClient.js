import axios from 'axios';

const API_BASE_URL =  'https://kanhaseva-in.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export { API_BASE_URL };
