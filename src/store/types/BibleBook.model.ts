export interface BibleBook {
  id: string;
  name: string;
  testament: 'Stary' | 'Nowy';
  siglum: string;
  created_at: string;
  updated_at: string;
}
