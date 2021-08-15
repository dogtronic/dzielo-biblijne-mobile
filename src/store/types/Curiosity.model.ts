import {ImageSource} from './ImageSource.model';

export interface CuriosityBase {
  id: number;
  image?: ImageSource;
  title?: string;
  comment?: string;
  is_visible_on_dashboard: boolean;
}

export enum CuriosityType {
  Photo = 'photo',
  Curiosity = 'curiosity',
}

export interface Curiosity extends CuriosityBase {
  image?: ImageSource;
  comment: string;
}

export interface Photo extends CuriosityBase {
  image: ImageSource;
  comment?: string;
}
