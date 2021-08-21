import {Chapter} from '../../types/Chapter.model';

export type GetChaptersRequestPayload = {
  bookId: string;
};

export type GetChapterDetailsRequestPayload = {
  chapterId: string;
};

export type GetChapterDetailsSuccessPayload = {
  chapter: Chapter;
  isNextChapter?: string;
  isPreviousChapter?: string;
};
