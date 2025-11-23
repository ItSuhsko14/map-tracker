export interface ObjectItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  direction?: number;
  status: 'active' | 'lost';
}
