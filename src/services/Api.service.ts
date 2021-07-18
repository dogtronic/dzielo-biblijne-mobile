import axios from 'axios';

const config = {
  baseUrl: 'http://localhost:1337/',
};

export enum Endpoint {
  SectionImages = 'sections-images/',
}

export const Api = axios.create();

Api.interceptors.request.use(
  axiosConfig => ({
    ...axiosConfig,
    baseURL: config.baseUrl,
  }),
  error => Promise.reject(error),
);
