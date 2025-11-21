import 'leaflet';

declare module 'leaflet' {
  interface Marker {
    setRotationAngle(angle: number): this;
    setRotationOrigin(origin: string): this;
  }

  interface MarkerOptions {
    rotationAngle?: number;
    rotationOrigin?: string;
  }
}
