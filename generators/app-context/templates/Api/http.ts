import axios from 'axios';
import qs from 'qs';

export const http = axios.create({
  baseURL: `//${process.env.API_HTTP_HOST}`,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
});
