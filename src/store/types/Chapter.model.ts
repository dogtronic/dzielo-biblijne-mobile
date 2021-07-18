import {BibleBook} from './BibleBook.model';

export interface Chapter {
  id: number;
  number: number;
  title: string;
  text: string;
  bible_book: BibleBook;
  created_at: string;
  updated_at: string;
}
