import {ImageSource} from './ImageSource.model';

export interface ReadingType {
  id: number;
  name: string;
  image: ImageSource;
  type: 'Glowne' | 'Poboczne';
}

export interface SectionType {
  id: number;
  name: string;
  image: string;
}

export interface Section {
  id: number;
  section_type: SectionType;
  content: string;
}

export interface Curiosity {
  id: number;
  image: string;
  comment?: string;
  is_visible_on_dashboard: boolean;
}

export interface Photo {
  id: number;
  image?: string;
  comment: string;
  is_visible_on_dashboard: boolean;
}

export interface Reading {
  id: number;
  description?: string;
  sub_description?: string;
  reading_type: ReadingType;
  visible_from: string;
  visible_to: string;
  content: string;
  sections: Section[];
  curiosities: Curiosity[];
  photos: Photo[];
}
