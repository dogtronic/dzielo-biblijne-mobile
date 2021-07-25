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

export const readingsSaga = [
  takeLatest(actions.getCurrentReadings.request, getCurrentReadings),
  takeLatest(actions.getReadingDetails.request, getReadingDetails),
];
