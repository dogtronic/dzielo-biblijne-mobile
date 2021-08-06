import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/notifications';

// Models
import {Notification} from '../../types/Notification.model';

export type NotificationsState = {
  notifications: Notification[];
  areNotificationsLoading: boolean;
  areMoreNotifications: boolean;
  notificationsError: boolean;

  notificationDetails?: Notification;
  isNotificationLoading: boolean;
  notificationDetailsError: boolean;

  newNotifications: Notification[];
};

const initialState: NotificationsState = {
  notifications: [],
  areNotificationsLoading: true,
  areMoreNotifications: true,
  notificationsError: false,
  notificationDetails: undefined,
  isNotificationLoading: true,
  notificationDetailsError: false,
  newNotifications: [],
};

export type NotificationsActions = ActionType<typeof actions>;

const notificationsReducer = createReducer<
  NotificationsState,
  NotificationsActions
>(initialState)
  .handleAction(actions.getNotifications.request, state => ({
    ...state,
    areNotificationsLoading: true,
    notificationsError: false,
  }))
  .handleAction(actions.getNotifications.success, (state, action) => ({
    ...state,
    areNotificationsLoading: false,
    notifications: action.payload.withReset
      ? action.payload.notifications
      : [...state.notifications, ...action.payload.notifications],
    areMoreNotifications: action.payload.areMoreData,
  }))
  .handleAction(actions.getNotifications.failure, state => ({
    ...state,
    areNotificationsLoading: false,
    notificationsError: true,
  }))
  .handleAction(actions.getNotificationDetails.request, state => ({
    ...state,
    isNotificationLoading: true,
    notificationDetailsError: false,
  }))
  .handleAction(actions.getNotificationDetails.success, (state, action) => ({
    ...state,
    isNotificationLoading: false,
    notificationDetails: action.payload,
  }))
  .handleAction(actions.getNotificationDetails.failure, state => ({
    ...state,
    isNotificationLoading: false,
    notificationDetailsError: true,
  }))
  .handleAction(actions.getNewNotifications.success, (state, action) => ({
    ...state,
    newNotifications: action.payload,
  }));

export default notificationsReducer;
