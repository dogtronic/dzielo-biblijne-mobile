import {ImageSource} from './ImageSource.model';

export interface ReadingType {
  id: string;
  name: string;
  image: ImageSource;
  type: 'Glowne' | 'Poboczne';
  priority: number;
}

export interface SectionType {
  id: string;
  name: string;
  image: string;
}

export interface Section {
  id: string;
  section_type: SectionType;
  content: string;
}

export interface Curiosity {
  id: string;
  image: string;
  comment?: string;
  is_visible_on_dashboard: boolean;
}

export interface Photo {
  id: string;
  image?: string;
  comment: string;
  is_visible_on_dashboard: boolean;
}

export interface Reading {
  id: string;
  description?: string;
  sub_description?: string;
  reading_type: ReadingType;
  visible_from: string;
  visible_to: string;
  content: string;
  sections: (Section & {section_type: number})[];
  curiosities: Curiosity[];
  photos: Photo[];
}
