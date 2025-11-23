import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Paper, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { authStore } from '../stores/authStore';

const AuthPanel = observer(() => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (!code.trim()) return;
    authStore.login(code.trim());
  };

  if (authStore.isAuthorized) {
    return (
      <Button
        variant='outlined'
        onClick={authStore.logout}
        sx={{
          position: 'absolute',
          top: { xs: 8, sm: 16 },
          left: { xs: 8, sm: 16 },
          zIndex: 10000,
          bgcolor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(6px)',
        }}
      >
        LOGOUT
      </Button>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        width: 280,
        p: 2,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
      }}
    >
      <Typography variant='subtitle1' fontWeight='bold' mb={1}>
        Authorization Required
      </Typography>

      <Typography variant='body2' color='text.secondary' mb={2}>
        Enter your access code to receive live tracking data.
      </Typography>

      <TextField
        fullWidth
        label='Access code'
        variant='outlined'
        size='small'
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={Boolean(authStore.error)}
        helperText={authStore.error ? 'Invalid code' : undefined}
      />

      <Box mt={2} display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          disabled={authStore.isLoading}
        >
          {authStore.isLoading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : 'Submit'}
        </Button>
      </Box>
    </Paper>
  );
});

export default AuthPanel;
