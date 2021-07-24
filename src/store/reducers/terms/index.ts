import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/terms';

// Models
import {Term} from '../../types/Term.model';

export type TermsState = {
  areTermsLoading: boolean;
  areMoreTerms: boolean;
  terms: Term[];
  isTermDetailsLoading: boolean;
  termDetails?: Term;
};

const initialState: TermsState = {
  areTermsLoading: true,
  areMoreTerms: true,
  terms: [],
  isTermDetailsLoading: true,
};

export type TermsActions = ActionType<typeof actions>;

const termsReducer = createReducer<TermsState, TermsActions>(initialState)
  .handleAction(actions.getTerms.request, state => ({
    ...state,
    areTermsLoading: true,
  }))
  .handleAction(actions.getTerms.success, (state, action) => ({
    ...state,
    areTermsLoading: false,
    terms: action.payload.withReset
      ? action.payload.terms
      : [...state.terms, ...action.payload.terms],
    areMoreTerms: action.payload.areMoreData,
  }))
  .handleAction(actions.getTermDetails.request, state => ({
    ...state,
    isTermDetailsLoading: true,
  }))
  .handleAction(actions.getTermDetails.success, (state, action) => ({
    ...state,
    isTermDetailsLoading: false,
    termDetails: action.payload,
  }));

export default termsReducer;
