import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Utils
import qs from 'qs';

// Models
import {ActionType} from 'typesafe-actions';
import {Place, Region} from '../../types/Region.model';

export function* getRegions() {
  try {
    const response: AxiosResponse<Region[]> = yield Api.get(Endpoint.Regions);
    yield put(actions.getRegions.success(response.data));
  } catch (err) {
    yield put(actions.getRegions.failure());
  }
}

export function* getPlacesFromRegion(
  action: ActionType<typeof actions.getPlacesFromRegion.request>,
) {
  try {
    const query = qs.stringify({'region.country': action.payload.countryCode});

    const response: AxiosResponse<Place[]> = yield Api.get(
      `${Endpoint.Places}?${query}`,
    );

    yield put(actions.getPlacesFromRegion.success(response.data));
  } catch (err) {
    yield put(actions.getPlacesFromRegion.failure());
  }
}

export const mapSaga = [
  takeLatest(actions.getRegions.request, getRegions),
  takeLatest(actions.getPlacesFromRegion.request, getPlacesFromRegion),
];
