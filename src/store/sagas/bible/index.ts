import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Models
import {BibleBook} from '../../types/BibleBook.model';

export function* getBooks() {
  try {
    const response: AxiosResponse<BibleBook[]> = yield Api.get(
      Endpoint.BibleBooks,
    );
    console.log(response.data);
    yield put(actions.getBooks.success(response.data));
  } catch (err) {
    yield put(actions.getAppSettings.failure());
  }
}

export const booksSaga = [takeLatest(actions.getBooks.request, getBooks)];
