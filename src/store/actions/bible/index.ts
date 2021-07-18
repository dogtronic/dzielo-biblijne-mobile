import {createAsyncAction} from 'typesafe-actions';
import {GetChaptersRequestPayload} from './payloads';

// Models
import {BibleBook} from '../../types/BibleBook.model';
import {Chapter} from '../../types/Chapter.model';

export const getBooks = createAsyncAction(
  'GET_BOOKS',
  'GET_BOOKS_SUCCESS',
  'GET_BOOKS_FAILURE',
)<undefined, BibleBook[], undefined>();

export const getChapters = createAsyncAction(
  'GET_CHAPTERS_LIST',
  'GET_CHAPTERS_LIST_SUCCESS',
  'GET_CHAPTERS_LIST_FAILURE',
)<GetChaptersRequestPayload, Chapter[], undefined>();
