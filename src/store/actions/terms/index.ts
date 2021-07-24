import {createAsyncAction} from 'typesafe-actions';
import {
  GetTermsRequestPayload,
  GetTermDetailsRequestPayload,
  GetTermsSuccessPayload,
} from './payloads';

// Models
import {Term} from '../../types/Term.model';

export const getTerms = createAsyncAction(
  'GET_TERMS',
  'GET_TERMS_SUCCESS',
  'GET_TERMS_FAILURE',
)<GetTermsRequestPayload, GetTermsSuccessPayload, undefined>();

export const getTermDetails = createAsyncAction(
  'GET_TERM_DETAILS',
  'GET_TERM_DETAILS_SUCCESS',
  'GET_TERM_DETAILS_FAILURE',
)<GetTermDetailsRequestPayload, Term, undefined>();
