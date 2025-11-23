import TrackerView from './components/TrackerViewComponent';
import { useEffect } from 'react';
import { webSocketManager } from './setup/WebSocketManager';
import { StoreProvider } from './stores/useStores';
import { useStores } from './hooks/useStores';
import { authStore } from './stores/authStore';

function App() {
  const { objectsStore } = useStores();

  authStore.checkAuth();

  useEffect(() => {
    webSocketManager.connect();
    objectsStore.startCleanupLoop();
  }, [objectsStore]);

  return (
    <StoreProvider>
      <TrackerView />
    </StoreProvider>
  );
}

export default App;
