import {Curiosity, Photo} from '../../types/Curiosity.model';
import {Reading, SectionType} from '../../types/Reading.model';

export type GetReadingDetailsRequestPayload = {
  readingId: string;
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

export type GetNationalReadingsRequestPayload = {
  limit: number;
  offset: number;
  filter?: string;
  withReset?: boolean;
};

export type GetNationalReadingsSuccessPayload = {
  nationalReadings: Reading[];
  areMoreData: boolean;
  withReset?: boolean;
};

export type GetCuriositiesRequestPayload = {
  limit: number;
  offset: number;
  filter?: string;
  withReset?: boolean;
  random?: boolean;
};

export type GetCuriositiesSuccessPayload = {
  curiosities: Curiosity[];
  areMoreData: boolean;
  withReset?: boolean;
};

export type GetPhotosSuccessPayload = {
  photos: Photo[];
  areMoreData: boolean;
  withReset?: boolean;
};
