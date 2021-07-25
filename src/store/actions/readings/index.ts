import {createAsyncAction} from 'typesafe-actions';
import {
  GetCurrentReadingsSuccessPayload,
  GetHomiliesRequestPayload,
  GetHomiliesSuccessPayload,
  GetNationalReadingsRequestPayload,
  GetNationalReadingsSuccessPayload,
  GetReadingDetailsRequestPayload,
} from './payloads';

// Models
import {Reading} from '../../types/Reading.model';

export const getCurrentReadings = createAsyncAction(
  'GET_CURRENT_READINGS',
  'GET_CURRENT_READINGS_SUCCESS',
  'GET_CURRENT_READINGS_FAILURE',
)<undefined, GetCurrentReadingsSuccessPayload, undefined>();

export const getReadingDetails = createAsyncAction(
  'GET_READINGS_DETAILS',
  'GET_READINGS_DETAILS_SUCCESS',
  'GET_READINGS_DETAILS_FAILURE',
)<GetReadingDetailsRequestPayload, Reading, undefined>();

export const getHomilies = createAsyncAction(
  'GET_HOMILIES',
  'GET_HOMILIES_SUCCESS',
  'GET_HOMILIES_FAILURE',
)<GetHomiliesRequestPayload, GetHomiliesSuccessPayload, undefined>();

export const getNationalReadings = createAsyncAction(
  'GET_NATIONAL_READINGS',
  'GET_NATIONAL_READINGS_SUCCESS',
  'GET_NATIONAL_READINGS_FAILURE',
)<
  GetNationalReadingsRequestPayload,
  GetNationalReadingsSuccessPayload,
  undefined
>();
