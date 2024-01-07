import {put, takeEvery} from 'redux-saga/effects';
import * as actions from '../../actions';
import {ActionType} from 'typesafe-actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Models
import {Term, TermType} from '../../types/Term.model';

export function* getTerms(action: ActionType<typeof actions.getTerms.request>) {
  try {
    let link = `${
      action.payload.type === TermType.Words
        ? Endpoint.Terms
        : Endpoint.BibleDictionary
    }?_start=${action.payload.offset}&_limit=${
      action.payload.limit
    }&_sort=term:ASC`;

    if (action.payload.filter) {
      link += `&term_contains=${action.payload.filter}`;
    }

    const response: AxiosResponse<Term[]> = yield Api.get(link);

    yield put(
      actions.getTerms.success({
        terms: response.data,
        areMoreData: response.data.length >= 30,
        withReset: action.payload.withReset,
      }),
    );
  } catch (err) {
    yield put(actions.getTerms.failure());
  }
}

export function* getTermDetails(
  action: ActionType<typeof actions.getTermDetails.request>,
) {
  try {
    const response: AxiosResponse<Term> = yield Api.get(
      `${
        action.payload.type === TermType.Words
          ? Endpoint.Terms
          : Endpoint.BibleDictionary
      }${action.payload.termId}`,
    );

    yield put(actions.getTermDetails.success(response.data));
  } catch (err) {
    yield put(actions.getTermDetails.failure());
  }
}

export const termsSaga = [
  takeEvery(actions.getTerms.request, getTerms),
  takeEvery(actions.getTermDetails.request, getTermDetails),
];
