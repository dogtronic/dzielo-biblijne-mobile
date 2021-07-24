import {createAsyncAction} from 'typesafe-actions';
import {GetReadingDetailsRequestPayload} from './payloads';

// Models
import {Reading} from '../../types/Reading.model';

export const getCurrentReadings = createAsyncAction(
  'GET_CURRENT_READINGS',
  'GET_CURRENT_READINGS_SUCCESS',
  'GET_CURRENT_READINGS_FAILURE',
)<undefined, Reading[], undefined>();

export const getReadingDetails = createAsyncAction(
  'GET_READINGS_DETAILS',
  'GET_READINGS_DETAILS_SUCCESS',
  'GET_READINGS_DETAILS_FAILURE',
)<GetReadingDetailsRequestPayload, Reading, undefined>();
