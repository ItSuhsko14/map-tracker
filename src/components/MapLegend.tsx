import { Stack, Typography, Paper } from '@mui/material';
import { directionIcon } from '../icons/directionIcon';
import L from 'leaflet';

type DivIcon = ReturnType<typeof L.divIcon>;

function LegendItem({ color, label }: { color: string; label: string }) {
  const icon = directionIcon(color) as DivIcon;

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <span
        dangerouslySetInnerHTML={{ __html: icon.options.html ?? '' }}
        style={{ width: 24, height: 24, display: 'inline-block' }}
      />
      <Typography variant='body2'>{label}</Typography>
    </Stack>
  );
}

export default function MapLegend() {
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        p: 2,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
      }}
    >
      <Typography variant='subtitle2' fontWeight='bold' mb={1}>
        Legend
      </Typography>

      <Stack spacing={1}>
        <LegendItem color='green' label='Active object' />
        <LegendItem color='red' label='Selected object' />
        <LegendItem color='grey' label='Lost object' />
      </Stack>
    </Paper>
  );
}
