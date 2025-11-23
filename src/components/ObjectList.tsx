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
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                itemRefs.current.set(obj.id, el);
              } else {
                itemRefs.current.delete(obj.id);
              }
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
              padding: 1,
            }}
          >
            <Typography
              variant='body2'
              fontWeight='bold'
              color={obj.status === 'lost' ? 'error.main' : 'success.main'}
            >
              {obj.id} - {obj.status}
            </Typography>

            <Typography variant='body2' color='text.secondary'>
              {obj.lat >= 0 ? 'N ' : 'S '}
              {Math.abs(obj.lat).toFixed(2)}° {obj.lng >= 0 ? ' E ' : ' W '}
              {Math.abs(obj.lng).toFixed(2)}° D:{' '}
              {obj.direction !== undefined ? Math.round(obj.direction) : 'N/A'}°
            </Typography>

            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
});

export default ObjectList;
