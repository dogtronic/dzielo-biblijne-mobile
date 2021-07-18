export interface BibleBook {
  id: number;
  name: string;
  testament: 'Stary' | 'Nowy';
  siglum: string;
  created_at: string;
  updated_at: string;
}
