import {Notification} from '../../types/Notification.model';

export interface GetNotificationsRequestPayload {
  limit: number;
  offset: number;
  filter?: string;
  withReset?: boolean;
}

export interface GetNotificationsSuccessPayload {
  notifications: Notification[];
  areMoreData: boolean;
  withReset?: boolean;
}

export interface GetNotificationDetailsRequestPayload {
  notificationId: string;
}
