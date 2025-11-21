import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';
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
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path='/' element={<MapPage />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
