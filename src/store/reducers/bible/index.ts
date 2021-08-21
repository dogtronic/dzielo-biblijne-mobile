import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/bible';

// Models
import {BibleBook} from '../../types/BibleBook.model';
import {Chapter} from '../../types/Chapter.model';

export type BibleState = {
  books: BibleBook[];
  isBooksLoading: boolean;
  booksError: boolean;
  chapters: Chapter[];
  isChaptersLoading: boolean;
  chaptersError: boolean;
  chapterDetails?: Chapter;
  isChapterDetailsLoading: boolean;
  chapterDetailsError: boolean;
  isNextChapter?: string;
  isPreviousChapter?: string;
};

const initialState: BibleState = {
  books: [],
  isBooksLoading: true,
  chapters: [],
  isChaptersLoading: true,
  chapterDetails: undefined,
  isChapterDetailsLoading: true,
  booksError: false,
  chaptersError: false,
  chapterDetailsError: false,
};

export type BibleActions = ActionType<typeof actions>;

const bibleReducer = createReducer<BibleState, BibleActions>(initialState)
  .handleAction(actions.getBooks.request, state => ({
    ...state,
    isBooksLoading: true,
    booksError: false,
  }))
  .handleAction(actions.getBooks.success, (state, action) => ({
    ...state,
    isBooksLoading: false,
    books: action.payload,
  }))
  .handleAction(actions.getBooks.failure, state => ({
    ...state,
    isBooksLoading: false,
    booksError: true,
  }))
  .handleAction(actions.getChapters.request, state => ({
    ...state,
    isChaptersLoading: true,
    chaptersError: false,
  }))
  .handleAction(actions.getChapters.success, (state, action) => ({
    ...state,
    isChaptersLoading: false,
    chapters: action.payload,
  }))
  .handleAction(actions.getChapters.failure, state => ({
    ...state,
    isChaptersLoading: false,
    chaptersError: true,
  }))
  .handleAction(actions.getChapterDetails.request, state => ({
    ...state,
    isChapterDetailsLoading: true,
    chapterDetailsError: false,
    isNextChapter: undefined,
    isPreviousChapter: undefined,
  }))
  .handleAction(actions.getChapterDetails.success, (state, action) => ({
    ...state,
    isChapterDetailsLoading: false,
    chapterDetails: action.payload.chapter,
    isNextChapter: action.payload.isNextChapter,
    isPreviousChapter: action.payload.isPreviousChapter,
  }))
  .handleAction(actions.getChapterDetails.failure, state => ({
    ...state,
    isChapterDetailsLoading: false,
    chapterDetailsError: true,
  }));

export default bibleReducer;
