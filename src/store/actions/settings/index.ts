import {createAction, createAsyncAction} from 'typesafe-actions';
import {Photo} from '../../types/Curiosity.model';
import {Information} from '../../types/Information.model';
import {
  GetAppSettingsResponsePayload,
  SendMessageToAdministratorRequestPayload,
} from './payloads';

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

export const sendMessageToAdministrator = createAsyncAction(
  'SEND_MESSAGE_TO_ADMINISTRATOR',
  'SEND_MESSAGE_TO_ADMINISTRATOR_SUCCESS',
  'SEND_MESSAGE_TO_ADMINISTRATOR_FAILURE',
)<SendMessageToAdministratorRequestPayload, string, string>();

export const getPhotoOfTheWeek = createAsyncAction(
  'GET_PHOTO_OF_THE_WEEK',
  'GET_PHOTO_OF_THE_WEEK_SUCCESS',
  'GET_PHOTO_OF_THE_WEEK_FAILURE',
)<undefined, Photo, undefined>();

export const clearMessageToAdministratorResponse = createAction(
  'CLEAR_MESSAGE_TO_ADMINISTRATOR_RESPONSE',
)<undefined>();
