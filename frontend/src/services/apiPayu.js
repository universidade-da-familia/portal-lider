import axios from 'axios';
import base64 from 'base-64';

const apiLogin = 'CURvRFvX0Azsfn3';
const apiKey = '5yg8kzk51kC7AQmO2UYk7cLWXi';

const api = axios.create({
  baseURL: 'https://api.payulatam.com',
  timeout: 20000,
  headers: {
    Authorization: 'asd',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
