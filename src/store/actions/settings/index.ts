import {createAsyncAction} from 'typesafe-actions';
import {Information} from '../../types/Information.model';
import {GetAppSettingsResponsePayload} from './payloads';

export const getAppSettings = createAsyncAction(
  'GET_APP_SETTINGS',
  'GET_APP_SETTINGS_SUCCESS',
  'GET_APP_SETTINGS_FAILURE',
)<undefined, GetAppSettingsResponsePayload, undefined>();

export const getContact = createAsyncAction(
  'GET_CONTACT',
  'GET_CONTACT_SUCCESS',
  'GET_CONTACT_FAILURE',
)<undefined, Information, undefined>();

export const getRecommended = createAsyncAction(
  'GET_RECOMMENDED',
  'GET_RECOMMENDED_SUCCESS',
  'GET_RECOMMENDED_FAILURE',
)<undefined, Information, undefined>();
