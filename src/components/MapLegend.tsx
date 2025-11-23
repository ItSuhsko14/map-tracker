import { Stack, Typography, Paper, Box } from '@mui/material';
import { directionIcon } from '../icons/directionIcon';
import L from 'leaflet';

type DivIcon = ReturnType<typeof L.divIcon>;

function LegendItem({ color, label }: { color: string; label: string }) {
  const icon = directionIcon(color) as DivIcon;

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Box
        sx={{
          width: { xs: 14, sm: 20 },
          height: { xs: 14, sm: 20 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        dangerouslySetInnerHTML={{ __html: icon.options.html ?? '' }}
      />
      <Typography variant='body2' sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
        {label}
      </Typography>
    </Stack>
  );
}

export default function MapLegend() {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        bottom: { xs: 8, sm: 16 },
        left: { xs: 8, sm: 16 },
        p: { xs: 0.8, sm: 1.5 },
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        width: { xs: 'auto', sm: '140px' },
        maxWidth: { xs: '120px', sm: '160px' },
      }}
    >
      <Typography
        variant='subtitle2'
        fontWeight='bold'
        mb={0.5}
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.85rem' },
        }}
      >
        Legend
      </Typography>

      <Stack spacing={0.5}>
        <LegendItem color='green' label='Active' />
        <LegendItem color='red' label='Selected' />
        <LegendItem color='grey' label='Lost' />
      </Stack>
    </Paper>
  );
}
