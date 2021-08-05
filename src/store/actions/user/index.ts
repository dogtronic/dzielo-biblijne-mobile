import {createAction} from 'typesafe-actions';
import {SetLastBibleFragmentPayload} from './payloads';

export const setReadNotification = createAction(
  'SET_READ_NOTIFICATION',
)<number>();

export const setRemovedNotificationFromDashboard = createAction(
  'SET_REMOVED_NOTIFICATION_FROM_DASHBOARD',
)<number>();

export const setLastReadBibleFragment = createAction(
  'SET_LAST_READ_BIBLE_FRAGMENT',
)<SetLastBibleFragmentPayload>();
