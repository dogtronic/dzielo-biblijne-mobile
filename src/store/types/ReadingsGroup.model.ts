import {ImageSource} from './ImageSource.model';
import {Reading} from './Reading.model';

export interface ReadingsGroup {
  id: string;
  name: string;
  date_from: string;
  date_to: string;
  image?: ImageSource;
  readings: Reading[];
}
