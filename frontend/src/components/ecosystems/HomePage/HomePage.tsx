import { FC } from 'react';
//components
import { Grid, Button } from '@mui/material';
// sub-components
import googleIcon from './google-icon.png';
import logo from './trips-planner-logo.png';

const HomePage: FC = () => {
  const google = () => {
    window.open('http://localhost:8000/auth/google', '_self');
  };

  return (
    <Grid
      container
      sx={{ width: '50%', margin: '15% auto' }}
      justifyContent="center"
      justifyItems="center"
    >
      <img style={{ transform: 'scale(0.8)', margin: '50px 0' }} src={logo} alt="logo" />
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          sx={{ width: '50%' }}
          onClick={google}
          startIcon={
            <img
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
              src={googleIcon}
              alt="logo"
            />
          }
        >
          Sign in with Google
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePage;
