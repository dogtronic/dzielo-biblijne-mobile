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

export function* getChapterDetails(
  action: ActionType<typeof actions.getChapterDetails.request>,
) {
  try {
    const response: AxiosResponse<Chapter> = yield Api.get(
      `${Endpoint.Chapters}${action.payload.chapterId}`,
    );

    const nextChapterResponse: AxiosResponse<Chapter[]> = yield Api.get(
      `${Endpoint.Chapters}?number=${response.data.number + 1}&bible_book.id=${
        response.data.bible_book.id
      }`,
    );

    const prevChapterResponse: AxiosResponse<Chapter[]> = yield Api.get(
      `${Endpoint.Chapters}?number=${response.data.number - 1}&bible_book.id=${
        response.data.bible_book.id
      }`,
    );

    yield put(
      actions.getChapterDetails.success({
        chapter: response.data,
        isNextChapter: nextChapterResponse?.data?.length
          ? nextChapterResponse.data[0].id
          : undefined,
        isPreviousChapter: prevChapterResponse?.data?.length
          ? prevChapterResponse.data[0].id
          : undefined,
      }),
    );
  } catch (err) {
    yield put(actions.getChapterDetails.failure());
  }
}

export const booksSaga = [
  takeLatest(actions.getBooks.request, getBooks),
  takeLatest(actions.getChapters.request, getChaptersByBookId),
  takeLatest(actions.getChapterDetails.request, getChapterDetails),
];
