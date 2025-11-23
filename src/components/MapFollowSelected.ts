import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import { objectsStore } from '../stores/objectsStore';

const MapFollowSelected = observer(() => {
  const map = useMap();
  const selected = objectsStore.selectedObject;

  useEffect(() => {
    if (!selected) return;

    map.setView([selected.lat, selected.lng], map.getZoom(), {
      animate: true,
      duration: 0.6,
    });
  }, [selected, map]);

  return null;
});

export default MapFollowSelected;
