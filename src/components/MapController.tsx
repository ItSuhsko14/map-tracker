import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapController() {
  const map = useMap();

  useEffect(() => {
    map.setView([50.45, 30.52], 14);
  }, [map]);

  return null;
}
