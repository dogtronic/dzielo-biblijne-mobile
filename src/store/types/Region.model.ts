import {ImageSource} from './ImageSource.model';

export interface Region {
  id: number;
  name: string;
  country: string;
  position: string;
  lat: number;
  lng: number;
}

export interface Place {
  id: number;
  region: Region;
  photo: ImageSource;
  name: string;
  description: string;
  position: string;
  lat: number;
  lng: number;
}

export interface Country {
  country: string;
  alpha2: string;
  alpha3: string;
  numeric: number;
  latitude: number;
  longitude: number;
}
