import { Paper, Box, Typography, Divider, Stack } from '@mui/material';
import { ObjectItem } from '../types/ObjectItem';
import { objectsStore } from '../stores/objectsStore';

interface ObjectListProps {
  objects: ObjectItem[];
}

function ObjectList({ objects }: ObjectListProps) {
  const sorted = [...objects].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === 'active' ? -1 : 1;
  });

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        width: 260,
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: 2,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
      }}
    >
      <Typography variant='subtitle1' fontWeight='bold'>
        Objects list ({objects.length})
      </Typography>

      <Divider sx={{ mb: 1 }} />

      <Stack spacing={1.2}>
        {sorted.map((obj) => (
          <Box
            key={obj.id}
            onClick={() => objectsStore.setSelected(obj.id)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography
              variant='body2'
              fontWeight='bold'
              color={obj.status === 'lost' ? 'error.main' : 'success.main'}
            >
              {obj.id}
            </Typography>

            <Typography
              variant='body2'
              color={obj.status === 'lost' ? 'error.main' : 'text.primary'}
            >
              Status: {obj.status}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {obj.lat >= 0 ? 'N ' : 'S '}
              {Math.abs(obj.lat).toFixed(2)}°
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {obj.lng >= 0 ? 'E ' : 'W '}
              {Math.abs(obj.lng).toFixed(2)}°
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Direction: {Math.round(obj.direction)}°
            </Typography>

            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default ObjectList;
