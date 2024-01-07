import {Photo} from './Curiosity.model';

export interface Region {
  id: string;
  name: string;
  country: string;
  position: string;
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  region: Region;
  photos: Photo[];
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
  lat: number;
  lng: number;
}
