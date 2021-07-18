import {put, takeLatest} from 'redux-saga/effects';
import * as actions from '../../actions';

// Api
import {AxiosResponse} from 'axios';
import {Api, Endpoint} from '../../../services/Api.service';

// Utils
import qs from 'qs';

// Models
import {BibleBook} from '../../types/BibleBook.model';
import {Chapter} from '../../types/Chapter.model';
import {ActionType} from 'typesafe-actions';

export function* getBooks() {
  try {
    const response: AxiosResponse<BibleBook[]> = yield Api.get(
      Endpoint.BibleBooks,
    );
    yield put(actions.getBooks.success(response.data));
  } catch (err) {
    yield put(actions.getBooks.failure());
  }
}

export function* getChaptersByBookId(
  action: ActionType<typeof actions.getChapters.request>,
) {
  try {
    const query = qs.stringify({'bible_book.id': action.payload.bookId});

    const response: AxiosResponse<Chapter[]> = yield Api.get(
      `${Endpoint.Chapters}?${query}`,
    );

    yield put(actions.getChapters.success(response.data));
  } catch (err) {
    yield put(actions.getChapters.failure());
  }
}

export const booksSaga = [
  takeLatest(actions.getBooks.request, getBooks),
  takeLatest(actions.getChapters.request, getChaptersByBookId),
];
