import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Models
import {SectionImages} from '../../types/SectionImages.model';

export function* getSettings() {
  try {
    const sectionImagesResponse: AxiosResponse<SectionImages> = yield Api.get(
      Endpoint.SectionImages,
    );
    yield put(
      actions.getAppSettings.success({
        sectionImages: sectionImagesResponse.data,
      }),
    );
  } catch (err) {
    yield put(actions.getAppSettings.failure());
  }
}

export const settingsSaga = [
  takeLatest(actions.getAppSettings.request, getSettings),
];
