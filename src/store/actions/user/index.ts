import {createAction} from 'typesafe-actions';

export const setReadNotification = createAction(
  'SET_READ_NOTIFICATION',
)<number>();

export const setRemovedNotificationFromDashboard = createAction(
  'SET_REMOVED_NOTIFICATION_FROM_DASHBOARD',
)<number>();
