/**
 * Custom Axios with default configuration
 */
import Axios from 'axios';

import { DEFAULT_API_PREFIX } from '@/config/default';

const baseURL = DEFAULT_API_PREFIX;
const axiosInstance = Axios.create({
  baseURL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
