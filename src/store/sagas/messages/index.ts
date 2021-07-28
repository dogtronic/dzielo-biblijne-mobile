import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';
import {ActionType} from 'typesafe-actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Models
import {Message} from '../../types/Message.model';

export function* getMessages(
  action: ActionType<typeof actions.getMessages.request>,
) {
  try {
    let link = `${Endpoint.Messages}?_start=${action.payload.offset}&_limit=${action.payload.limit}`;

    const response: AxiosResponse<Message[]> = yield Api.get(link);

    yield put(
      actions.getMessages.success({
        messages: response.data,
        areMoreData: response.data.length >= 10,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getMessages.failure());
  }
}

export function* getMessageDetails(
  action: ActionType<typeof actions.getMessageDetails.request>,
) {
  try {
    const response: AxiosResponse<Message> = yield Api.get(
      `${Endpoint.Messages}${action.payload.messageId}`,
    );

    yield put(actions.getMessageDetails.success(response.data));
  } catch (err) {
    yield put(actions.getMessageDetails.failure());
  }
}

export function* getNewMessages() {
  try {
    const response: AxiosResponse<Message[]> = yield Api.get(
      `${Endpoint.Messages}?isRead=true`,
    );

    yield put(actions.getNewMessages.success(response.data));
  } catch (err) {
    yield put(actions.getNewMessages.failure());
  }
}

export const messagesSaga = [
  takeLatest(actions.getMessages.request, getMessages),
  takeLatest(actions.getMessageDetails.request, getMessageDetails),
  takeLatest(actions.getNewMessages.request, getNewMessages),
];
