import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

export enum Endpoint {
  SectionImages = 'sections-images/',
  BibleBooks = 'bible-books/',
  Chapters = 'chapters/',
  Terms = 'terms/',
  BibleDictionary = 'bible-dictionaries/',
  Readings = 'readings/',
  ReadingsTypes = 'reading-types/',
  Sections = 'sections/',
  SectionTypes = 'section-types/',
  Contact = 'contact/',
  Recommended = 'recommended/',
  Curiosities = 'curiosities/',
  Photos = 'photos/',
  Notifications = 'notifications/',
  Messages = 'messages/',
  Regions = 'regions/',
  Places = 'places/',
}

export const Api = axios.create();

Api.interceptors.request.use(
  axiosConfig => ({
    ...axiosConfig,
    baseURL: API_URL,
  }),
  error => Promise.reject(error),
);
