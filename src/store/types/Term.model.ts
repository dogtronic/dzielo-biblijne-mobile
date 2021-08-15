export interface Term {
  id: number;
  term: string;
  description: string;
}

export enum TermType {
  Words = 'words',
  BibleDictionary = 'bible-dictionary',
}
