import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 50000,
});

api.interceptors.request.use(async config => {
  const token = await localStorage.getItem('@dashboard/token');
  const user_logged_id = await localStorage.getItem('@dashboard/user');
  const user_logged_type = await localStorage.getItem('@dashboard/user_type');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (user_logged_type) {
    config.headers.user_logged_type = user_logged_type;
  }

  if (user_logged_id) {
    config.headers.user_logged_id = user_logged_id;
  }

  return config;
});

export default api;
