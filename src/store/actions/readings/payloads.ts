import {Reading, SectionType} from '../../types/Reading.model';

export type GetReadingDetailsRequestPayload = {
  readingId: number;
};

export type GetCurrentReadingsSuccessPayload = {
  readings: Reading[];
  sections: SectionType[];
};

export type GetHomiliesRequestPayload = {
  limit: number;
  offset: number;
  filter?: string;
  withReset?: boolean;
};

export type GetHomiliesSuccessPayload = {
  homilies: Reading[];
  areMoreData: boolean;
  withReset?: boolean;
};
