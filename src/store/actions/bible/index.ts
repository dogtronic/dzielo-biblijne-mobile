import {createAsyncAction} from 'typesafe-actions';
import {BibleBook} from '../../types/BibleBook.model';

export const getBooks = createAsyncAction(
  'GET_BOOKS',
  'GET_BOOKS_SUCCESS',
  'GET_BOOKS_FAILURE',
)<undefined, BibleBook[], undefined>();
