import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';
import {ActionType} from 'typesafe-actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Utils
import dayjs from 'dayjs';

// Models
import {Reading, SectionType} from '../../types/Reading.model';
import {Curiosity, Photo} from '../../types/Curiosity.model';

export function* getCurrentReadings() {
  try {
    const startWeekDate = dayjs().startOf('week').format('YYYY-MM-DDTHH:mm');
    const endWeekDate = dayjs().endOf('week').format('YYYY-MM-DDTHH:mm');

    const readingsResponse: AxiosResponse<Reading[]> = yield Api.get(
      `${Endpoint.Readings}?visible_from_lte=${endWeekDate}&visible_to_gte=${startWeekDate}`,
    );

    const sectionsResponse: AxiosResponse<SectionType[]> = yield Api.get(
      Endpoint.SectionTypes,
    );

    yield put(
      actions.getCurrentReadings.success({
        readings: readingsResponse.data,
        sections: sectionsResponse.data,
      }),
    );
  } catch (err) {
    yield put(actions.getCurrentReadings.failure());
  }
}

export function* getReadingDetails(
  action: ActionType<typeof actions.getReadingDetails.request>,
) {
  try {
    const response: AxiosResponse<Reading> = yield Api.get(
      `${Endpoint.Readings}${action.payload.readingId}`,
    );

    yield put(actions.getReadingDetails.success(response.data));
  } catch (err) {
    yield put(actions.getReadingDetails.failure());
  }
}

export function* getHomilies(
  action: ActionType<typeof actions.getHomilies.request>,
) {
  try {
    let link = `${Endpoint.Readings}?_start=${action.payload.offset}&_limit=${action.payload.limit}&_reading_type.name=Homilia`;

    if (action.payload.filter) {
      link += `&term_contains=${action.payload.filter}`;
    }

    const response: AxiosResponse<Reading[]> = yield Api.get(link);

    yield put(
      actions.getHomilies.success({
        homilies: response.data,
        areMoreData: response.data.length >= 10,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getHomilies.failure());
  }
}

export function* getNationalReadings(
  action: ActionType<typeof actions.getNationalReadings.request>,
) {
  try {
    let link = `${Endpoint.Readings}?_start=${action.payload.offset}&_limit=${action.payload.limit}&_reading_type.name=Narodowe czytanie`;

    if (action.payload.filter) {
      link += `&term_contains=${action.payload.filter}`;
    }

    const response: AxiosResponse<Reading[]> = yield Api.get(link);

    yield put(
      actions.getNationalReadings.success({
        nationalReadings: response.data,
        areMoreData: response.data.length >= 10,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getNationalReadings.failure());
  }
}

export function* getCuriosities(
  action: ActionType<typeof actions.getCuriosities.request>,
) {
  try {
    const response: AxiosResponse<Curiosity[]> = yield Api.get(
      `${Endpoint.Curiosities}?_start=${action.payload.offset}&_limit=${action.payload.limit}`,
    );

    yield put(
      actions.getCuriosities.success({
        curiosities: response.data,
        areMoreData: response.data.length >= 10,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getCuriosities.failure());
  }
}

export function* getPhotos(
  action: ActionType<typeof actions.getPhotos.request>,
) {
  try {
    const response: AxiosResponse<Photo[]> = yield Api.get(
      `${Endpoint.Photos}?_start=${action.payload.offset}&_limit=${action.payload.limit}`,
    );

    yield put(
      actions.getPhotos.success({
        photos: response.data,
        areMoreData: response.data.length >= 10,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getPhotos.failure());
  }
}

export const readingsSaga = [
  takeLatest(actions.getCurrentReadings.request, getCurrentReadings),
  takeLatest(actions.getReadingDetails.request, getReadingDetails),
  takeLatest(actions.getHomilies.request, getHomilies),
  takeLatest(actions.getNationalReadings.request, getNationalReadings),
  takeLatest(actions.getCuriosities.request, getCuriosities),
  takeLatest(actions.getPhotos.request, getPhotos),
];
