import {createReducer, ActionType} from 'typesafe-actions';
import * as actions from '../../actions/terms';

// Models
import {Term} from '../../types/Term.model';

export type TermsState = {
  areTermsLoading: boolean;
  areMoreTerms: boolean;
  termsError: boolean;
  terms: Term[];
  isTermDetailsLoading: boolean;
  termDetails?: Term;
  termDetailsError: boolean;
};

const initialState: TermsState = {
  areTermsLoading: true,
  areMoreTerms: true,
  terms: [],
  isTermDetailsLoading: true,
  termsError: false,
  termDetailsError: false,
};

export type TermsActions = ActionType<typeof actions>;

const termsReducer = createReducer<TermsState, TermsActions>(initialState)
  .handleAction(actions.getTerms.request, state => ({
    ...state,
    areTermsLoading: true,
    termsError: false,
  }))
  .handleAction(actions.getTerms.success, (state, action) => ({
    ...state,
    areTermsLoading: false,
    terms: action.payload.withReset
      ? action.payload.terms
      : [...state.terms, ...action.payload.terms],
    areMoreTerms: action.payload.areMoreData,
  }))
  .handleAction(actions.getTerms.failure, state => ({
    ...state,
    areTermsLoading: false,
    termsError: true,
  }))
  .handleAction(actions.getTermDetails.request, state => ({
    ...state,
    isTermDetailsLoading: true,
    termDetailsError: false,
  }))
  .handleAction(actions.getTermDetails.success, (state, action) => ({
    ...state,
    isTermDetailsLoading: false,
    termDetails: action.payload,
  }))
  .handleAction(actions.getTermDetails.failure, state => ({
    ...state,
    isTermDetailsLoading: false,
    termDetailsError: true,
  }));

export default termsReducer;
