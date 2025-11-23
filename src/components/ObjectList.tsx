import { observer } from 'mobx-react-lite';
import { Paper, Box, Typography, Divider, Stack } from '@mui/material';
import { objectsStore } from '../stores/objectsStore';
import { useEffect, useRef } from 'react';
import type { ObjectItem } from '../types/ObjectItem';

interface ObjectListProps {
  objects: ObjectItem[];
}

const ObjectList = observer(({ objects }: ObjectListProps) => {
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const sorted = [...objects].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === 'active' ? -1 : 1;
  });

  useEffect(() => {
    const id = objectsStore.selectedObjectId;
    if (!id) return;

    const el = itemRefs.current.get(id);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: { xs: 6, sm: 16 },
        right: { xs: 6, sm: 16 },
        width: { xs: '65vw', sm: 260 },
        maxHeight: { xs: '55vh', sm: '80vh' },
        overflowY: 'auto',
        p: { xs: 0.6, sm: 2 },
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
      }}
    >
      <Typography
        variant='subtitle2'
        fontWeight='bold'
        sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
      >
        Objects list ({objects.length})
      </Typography>

      <Divider sx={{ mb: { xs: 0.5, sm: 1 } }} />

      <Stack spacing={{ xs: 0.6, sm: 1.2 }}>
        {sorted.map((obj) => (
          <Box
            ref={(el) => {
              if (el) itemRefs.current.set(obj.id, el);
              else itemRefs.current.delete(obj.id);
            }}
            key={obj.id}
            onClick={() => objectsStore.setSelected(obj.id)}
            sx={{
              cursor: 'pointer',
              bgcolor:
                obj.id === objectsStore.selectedObjectId
                  ? 'rgba(251, 222, 221, 0.74)'
                  : 'transparent',
              border:
                obj.id === objectsStore.selectedObjectId
                  ? '2px solid rgba(238, 13, 5, 0.74)'
                  : '2px solid transparent',
              borderRadius: 1,
              p: { xs: 0.6, sm: 1 },
            }}
          >
            <Typography
              fontWeight='bold'
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                color: obj.status === 'lost' ? 'error.main' : 'success.main',
              }}
            >
              {obj.id} — {obj.status}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.85rem' },
                color: 'text.secondary',
              }}
            >
              {obj.lat >= 0 ? 'N ' : 'S '}
              {Math.abs(obj.lat).toFixed(2)}° •{obj.lng >= 0 ? ' E ' : ' W '}
              {Math.abs(obj.lng).toFixed(2)}° • D:
              {obj.direction ? Math.round(obj.direction) : 'N/A'}°
            </Typography>

            <Divider sx={{ mt: { xs: 0.4, sm: 1 } }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
});

export default ObjectList;
