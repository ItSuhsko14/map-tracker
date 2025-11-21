import { observer } from 'mobx-react-lite';
import { useStores } from '../hooks/useStores';
import MapView from './MapView';
import ObjectList from './ObjectList';
import MapLegend from './MapLegend';
import AuthPanel from './AuthPanel';

const TrackerView = observer(() => {
  const { objectsStore } = useStores();

  return (
    <>
      <MapView objects={objectsStore.allObjects} />
      <ObjectList objects={objectsStore.allObjects} />
      <MapLegend />
      <AuthPanel />
    </>
  );
});

export default TrackerView;
