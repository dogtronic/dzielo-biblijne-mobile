import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/bible';
import {BibleBook} from '../../types/BibleBook.model';

export type BibleState = {
  books: BibleBook[];
  isBooksLoading: boolean;
};

const initialState: BibleState = {
  books: [],
  isBooksLoading: true,
};

export type BibleActions = ActionType<typeof actions>;

const bibleReducer = createReducer<BibleState, BibleActions>(initialState)
  .handleAction(actions.getBooks.request, state => ({
    ...state,
    isBooksLoading: true,
  }))
  .handleAction(actions.getBooks.success, (state, action) => ({
    ...state,
    isBooksLoading: false,
    books: action.payload,
  }));

export default bibleReducer;
