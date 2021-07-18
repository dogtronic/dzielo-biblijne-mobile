import {createAsyncAction} from 'typesafe-actions';
import {GetAppSettingsResponsePayload} from './payloads';

export const getAppSettings = createAsyncAction(
  'GET_APP_SETTINGS',
  'GET_APP_SETTINGS_SUCCESS',
  'GET_APP_SETTINGS_FAILURE',
)<undefined, GetAppSettingsResponsePayload, undefined>();
