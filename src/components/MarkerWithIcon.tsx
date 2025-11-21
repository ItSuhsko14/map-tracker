import { useEffect } from 'react';
import { useMap, MarkerProps } from 'react-leaflet';
import L from 'leaflet';

type DivIcon = ReturnType<typeof L.divIcon>;

interface Props extends MarkerProps {
  position: [number, number];
  icon: DivIcon;
  rotationAngle?: number;
  rotationOrigin?: string;
  children?: React.ReactNode;
}

export default function MarkerWithIcon({
  position,
  icon,
  rotationAngle,
  rotationOrigin = 'center',
}: Props) {
  const map = useMap();

  useEffect(() => {
    const marker = L.marker(position, {
      icon,
      rotationAngle,
      rotationOrigin,
    } as L.MarkerOptions).addTo(map);

    return () => {
      map.removeLayer(marker);
    };
  }, [position, icon, rotationAngle, rotationOrigin, map]);

  return null;
}
