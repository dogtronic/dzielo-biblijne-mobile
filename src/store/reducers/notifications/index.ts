import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/notifications';

// Models
import {Notification} from '../../types/Notification.model';

export type NotificationsState = {
  notifications: Notification[];
  areNotificationsLoading: boolean;
  areMoreNotifications: boolean;

  notificationDetails?: Notification;
  isNotificationLoading: boolean;

  newNotifications: Notification[];
};

const initialState: NotificationsState = {
  notifications: [],
  areNotificationsLoading: true,
  areMoreNotifications: true,
  notificationDetails: undefined,
  isNotificationLoading: true,
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
  }))
  .handleAction(actions.getNotifications.success, (state, action) => ({
    ...state,
    areNotificationsLoading: false,
    notifications: action.payload.withReset
      ? action.payload.notifications
      : [...state.notifications, ...action.payload.notifications],
    areMoreNotifications: action.payload.areMoreData,
  }))
  .handleAction(actions.getNotificationDetails.request, state => ({
    ...state,
    isNotificationLoading: true,
  }))
  .handleAction(actions.getNotificationDetails.success, (state, action) => ({
    ...state,
    isNotificationLoading: false,
    notificationDetails: action.payload,
  }))
  .handleAction(actions.getNewNotifications.success, (state, action) => ({
    ...state,
    newNotifications: action.payload,
  }));

export default notificationsReducer;
