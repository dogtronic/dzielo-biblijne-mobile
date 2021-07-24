import {Term} from '../../types/Term.model';

export type GetTermsRequestPayload = {
  limit: number;
  offset: number;
  filter?: string;
  withReset?: boolean;
};

export type GetTermsSuccessPayload = {
  terms: Term[];
  areMoreData: boolean;
  withReset?: boolean;
};

export type GetTermDetailsRequestPayload = {
  termId: number;
};
