export interface Term {
  id: string;
  term: string;
  description: string;
}

export enum TermType {
  Words = 'words',
  BibleDictionary = 'bible-dictionary',
}
