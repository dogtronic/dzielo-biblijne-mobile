import {Reading, SectionType} from '../../types/Reading.model';

export type GetReadingDetailsRequestPayload = {
  readingId: number;
};

export type GetCurrentReadingsSuccessPayload = {
  readings: Reading[];
  sections: SectionType[];
};
