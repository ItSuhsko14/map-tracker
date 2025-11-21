export interface ObjectItem {
  id: string;
  lat: number;
  lng: number;
  direction: number;
  updatedAt: number;
  status: 'active' | 'lost';
}
