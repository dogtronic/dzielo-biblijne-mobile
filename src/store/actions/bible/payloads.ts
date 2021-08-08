import {Chapter} from '../../types/Chapter.model';

export type GetChaptersRequestPayload = {
  bookId: number;
};

export type GetChapterDetailsRequestPayload = {
  chapterId: number;
};

export type GetChapterDetailsSuccessPayload = {
  chapter: Chapter;
  isNextChapter?: number;
  isPreviousChapter?: number;
};
