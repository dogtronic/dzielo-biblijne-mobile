import axios from 'axios';
import {Config} from '../../config';

export enum Endpoint {
  SectionImages = 'sections-images/',
  BibleBooks = 'bible-books/',
}

export const Api = axios.create();

Api.interceptors.request.use(
  axiosConfig => ({
    ...axiosConfig,
    baseURL: Config.baseUrl,
  }),
  error => Promise.reject(error),
);
