import L from 'leaflet';
import './directionIcon.css';

export const directionIcon = (color: string) =>
  L.divIcon({
    className: 'direction-icon',
    html: `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 2L5 20L12 16L19 20L12 2Z" />
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
