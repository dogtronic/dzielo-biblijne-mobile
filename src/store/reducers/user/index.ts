import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/user';

export type UserState = {
  readNotifications: {[key in number]: boolean};
  removedNotificationsFromDashboard: {[key in number]: boolean};
  lastReadBibleFragment?: {
    bookId: number;
    siglum: string;
    chapterId: number;
    chapterNumber: number;
  };
  fontSize: number;
};

const initialState: UserState = {
  readNotifications: {},
  removedNotificationsFromDashboard: {},
  fontSize: 15,
};

export type UserActions = ActionType<typeof actions>;

const userReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(actions.setReadNotification, (state, action) => {
    const readNotificationsCopy = {...state.readNotifications};
    readNotificationsCopy[action.payload] = true;

    return {
      ...state,
      readNotifications: readNotificationsCopy,
    };
  })
  .handleAction(
    actions.setRemovedNotificationFromDashboard,
    (state, action) => {
      const removedNotificationsFromDashboardCopy = {
        ...state.removedNotificationsFromDashboard,
      };
      removedNotificationsFromDashboardCopy[action.payload] = true;

      return {
        ...state,
        removedNotificationsFromDashboard:
          removedNotificationsFromDashboardCopy,
      };
    },
  )
  .handleAction(actions.setLastReadBibleFragment, (state, action) => ({
    ...state,
    lastReadBibleFragment: action.payload,
  }))
  .handleAction(actions.setFontSize, (state, action) => ({
    ...state,
    fontSize: action.payload,
  }));

export default userReducer;
