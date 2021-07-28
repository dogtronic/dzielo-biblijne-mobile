import {createAsyncAction} from 'typesafe-actions';
import {Message} from '../../types/Message.model';
import {
  GetMessageDetailsRequestPayload,
  GetMessagesRequestPayload,
  GetMessagesSuccessPayload,
} from './payloads';

export const getMessages = createAsyncAction(
  'GET_MESSAGES',
  'GET_MESSAGES_SUCCESS',
  'GET_MESSAGES_FAILURE',
)<GetMessagesRequestPayload, GetMessagesSuccessPayload, undefined>();

export const getMessageDetails = createAsyncAction(
  'GET_MESSAGE_DETAILS',
  'GET_MESSAGE_DETAILS_SUCCESS',
  'GET_MESSAGE_DETAILS_FAILURE',
)<GetMessageDetailsRequestPayload, Message, undefined>();

export const getNewMessages = createAsyncAction(
  'GET_NEW_MESSAGES',
  'GET_NEW_MESSAGES_SUCCESS',
  'GET_NEW_MESSAGES_FAILURE',
)<undefined, Message[], undefined>();
