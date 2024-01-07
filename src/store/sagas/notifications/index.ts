import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';
import {ActionType} from 'typesafe-actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Models
import {Notification} from '../../types/Notification.model';

export function* getNotifications(
  action: ActionType<typeof actions.getNotifications.request>,
) {
  try {
    let link = `${Endpoint.Notifications}?_sort=createdAt:DESC&_start=${action.payload.offset}&_limit=${action.payload.limit}`;

    const response: AxiosResponse<Notification[]> = yield Api.get(link);

    yield put(
      actions.getNotifications.success({
        notifications: response.data,
        areMoreData: response.data.length >= 10,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getNotifications.failure());
  }
}

export function* getNotificationDetails(
  action: ActionType<typeof actions.getNotificationDetails.request>,
) {
  try {
    const response: AxiosResponse<Notification> = yield Api.get(
      `${Endpoint.Notifications}${action.payload.notificationId}`,
    );

    yield Api.patch(
      `${Endpoint.Notifications}${action.payload.notificationId}/view`,
    );

    yield put(actions.getNotificationDetails.success(response.data));
  } catch (err) {
    yield put(actions.getNotificationDetails.failure());
  }
}

export function* getNewNotifications() {
  try {
    const response: AxiosResponse<Notification[]> = yield Api.get(
      `${Endpoint.Notifications}?visible_on_dashboard=true`,
    );

    yield put(actions.getNewNotifications.success(response.data));
  } catch (err) {
    yield put(actions.getNewNotifications.failure());
  }
}

export const notificationsSaga = [
  takeLatest(actions.getNotifications.request, getNotifications),
  takeLatest(actions.getNotificationDetails.request, getNotificationDetails),
  takeLatest(actions.getNewNotifications.request, getNewNotifications),
];
