import { MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import MarkerWithIcon from './MarkerWithIcon';
import { directionIcon } from '../icons/directionIcon';
import MapController from './MapController';
import type { ObjectItem } from '../types/ObjectItem';
import { objectsStore } from '../stores/objectsStore';

interface MapViewProps {
  objects: ObjectItem[];
}

function MapView({ objects }: MapViewProps) {
  return (
    <MapContainer style={{ height: '100vh', width: '100vw' }}>
      <MapController />

      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {objects.map((obj) => {
        const isSelected = objectsStore.selectedObjectId === obj.id;
        const color = isSelected ? 'red' : obj.status === 'lost' ? 'grey' : 'green';

        return (
          <MarkerWithIcon
            key={obj.id + obj.direction}
            position={[obj.lat, obj.lng]}
            icon={directionIcon(color)}
            rotationAngle={obj.direction}
            rotationOrigin='center'
          >
            <Tooltip>
              {obj.id} ({obj.direction.toFixed(0)}°)
              <br />
              status: {obj.status}
            </Tooltip>
          </MarkerWithIcon>
        );
      })}
    </MapContainer>
  );
}

export default MapView;
