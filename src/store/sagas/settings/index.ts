import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Models
import {SectionImages} from '../../types/SectionImages.model';
import {Information} from '../../types/Information.model';

// Sagas
import {getNewNotifications} from '../notifications';

export function* getSettings() {
  try {
    const sectionImagesResponse: AxiosResponse<SectionImages> = yield Api.get(
      Endpoint.SectionImages,
    );

    yield getNewNotifications();

    yield put(
      actions.getAppSettings.success({
        sectionImages: sectionImagesResponse.data,
      }),
    );
  } catch (err) {
    yield put(actions.getAppSettings.failure());
  }
}

export function* getContact() {
  try {
    const response: AxiosResponse<Information> = yield Api.get(
      Endpoint.Contact,
    );
    yield put(actions.getContact.success(response.data));
  } catch (err) {
    yield put(actions.getContact.failure());
  }
}

export function* getRecommended() {
  try {
    const response: AxiosResponse<Information> = yield Api.get(
      Endpoint.Recommended,
    );
    yield put(actions.getRecommended.success(response.data));
  } catch (err) {
    yield put(actions.getRecommended.failure());
  }
}

export const settingsSaga = [
  takeLatest(actions.getAppSettings.request, getSettings),
  takeLatest(actions.getContact.request, getContact),
  takeLatest(actions.getRecommended.request, getRecommended),
];
