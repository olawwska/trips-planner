import { useEffect } from 'react';
// components
import { Grid, Typography } from '@mui/material';
// logo
import logo from './trips-planner-logo.png';

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 2000);
  });

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ height: '100vh' }}
    >
      <Grid item>
        <img style={{ transform: 'scale(0.8)', marginBottom: '20px' }} src={logo} alt="logo" />
        <Typography variant="h2" align="center">
          Thanks for logging in!
        </Typography>
      </Grid>
    </Grid>
  );
};
export default LoginSuccess;
