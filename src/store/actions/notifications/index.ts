import {createAsyncAction} from 'typesafe-actions';
import {Notification} from '../../types/Notification.model';
import {
  GetNotificationDetailsRequestPayload,
  GetNotificationsRequestPayload,
  GetNotificationsSuccessPayload,
} from './payloads';

export const getNotifications = createAsyncAction(
  'GET_MESSAGES',
  'GET_MESSAGES_SUCCESS',
  'GET_MESSAGES_FAILURE',
)<GetNotificationsRequestPayload, GetNotificationsSuccessPayload, undefined>();

export const getNotificationDetails = createAsyncAction(
  'GET_MESSAGE_DETAILS',
  'GET_MESSAGE_DETAILS_SUCCESS',
  'GET_MESSAGE_DETAILS_FAILURE',
)<GetNotificationDetailsRequestPayload, Notification, undefined>();

export const getNewNotifications = createAsyncAction(
  'GET_NEW_MESSAGES',
  'GET_NEW_MESSAGES_SUCCESS',
  'GET_NEW_MESSAGES_FAILURE',
)<undefined, Notification[], undefined>();
