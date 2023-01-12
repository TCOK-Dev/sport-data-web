import axiosLib from 'axios';
import { BASE_URL } from '../constants/global';

const axios = axiosLib.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = UserInformationService.getToken();
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

export default axios;
