import {ImageSource} from './ImageSource.model';
import {Reading} from './Reading.model';

export interface ReadingsGroup {
  id: string;
  name: string;
  date_from: string;
  date_to: string;
  readings: Reading[];
  photos_of_the_week: PhotoOfTheWeek;
}

export interface PhotoOfTheWeek {
  id: string;
  description?: string;
  image: ImageSource;
}
