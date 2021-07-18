import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/bible';

// Models
import {BibleBook} from '../../types/BibleBook.model';
import {Chapter} from '../../types/Chapter.model';

export type BibleState = {
  books: BibleBook[];
  isBooksLoading: boolean;
  chapters: Chapter[];
  isChaptersLoading: boolean;
};

const initialState: BibleState = {
  books: [],
  isBooksLoading: true,
  chapters: [],
  isChaptersLoading: true,
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
  }))
  .handleAction(actions.getChapters.request, state => ({
    ...state,
    isChaptersLoading: true,
  }))
  .handleAction(actions.getChapters.success, (state, action) => ({
    ...state,
    isChaptersLoading: false,
    chapters: action.payload,
  }));

export default bibleReducer;
