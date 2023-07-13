import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import { Grid, Button } from '@mui/material';
// sub-components
import googleIcon from './google-icon.png';
import logo from './trips-planner-logo.png';
import axios from 'axios';
import useContext from '../context';

const HomePage: FC = () => {
  const { dispatch } = useContext();
  const navigate = useNavigate();

  const fetchAuthUser = async () => {
    const response = await axios
      .get('http://localhost:8000/auth/user', { withCredentials: true })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'AUTHENTICATE_USER', isAuthenticated: false, authenticatedUserName: '' });
        // navigate('/login/error');
      });

    if (response && response.data) {
      navigate('/cities');
      dispatch({
        type: 'AUTHENTICATE_USER',
        isAuthenticated: true,
        authenticatedUserName: response.data,
      });
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const googleLoginURL = 'http://localhost:8000/auth/google';
    const newWindow = window.open(googleLoginURL, '_self');

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <Grid
      container
      sx={{ width: '50%', margin: '15% auto' }}
      display="flex"
      justifyContent="center"
    >
      <Grid item>
        <img style={{ transform: 'scale(0.8)', margin: '50px 0' }} src={logo} alt="logo" />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Button
          sx={{ width: '50%' }}
          onClick={redirectToGoogleSSO}
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
