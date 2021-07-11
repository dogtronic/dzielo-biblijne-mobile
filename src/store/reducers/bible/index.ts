import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/bible';

export type BibleState = {
  books: [];
};

const initialState: BibleState = {
  books: [],
};

export type BibleActions = ActionType<typeof actions>;

const bibleReducer = createReducer<BibleState, BibleActions>(
  initialState,
).handleAction(actions.getBooks.request, (state, action) => ({...state}));

export default bibleReducer;
