import {createAsyncAction} from 'typesafe-actions';

export const getBooks = createAsyncAction(
  'GET_BOOKS',
  'GET_BOOKS_SUCCESS',
  'GET_BOOKS_FAILURE',
)<undefined, undefined, undefined>();
