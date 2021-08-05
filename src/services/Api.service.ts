import axios from 'axios';
import {Config} from '../../config';

export enum Endpoint {
  SectionImages = 'sections-images/',
  BibleBooks = 'bible-books/',
  Chapters = 'chapters/',
  Terms = 'terms/',
  Readings = 'readings/',
  Sections = 'sections/',
  SectionTypes = 'section-types/',
  Contact = 'contact/',
  Recommended = 'recommended/',
  Curiosities = 'curiosities/',
  Photos = 'photos/',
  Notifications = 'notifications/',
  Messages = 'messages/',
}

export const Api = axios.create();

Api.interceptors.request.use(
  axiosConfig => ({
    ...axiosConfig,
    baseURL: Config.baseUrl,
  }),
  error => Promise.reject(error),
);
