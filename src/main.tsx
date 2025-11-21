import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'leaflet/dist/leaflet.css';
import './setup/leaflet-extensions';
import './leaflet-icons';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
  disableErrorBoundaries: true,
  reactionScheduler: (f) => setTimeout(f),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
