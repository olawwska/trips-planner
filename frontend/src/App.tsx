import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { MapInfoWindowProvider } from 'components/ecosystems/context';
// components
import AttractionsPage from './components/ecosystems/AttractionsPage/AttractionsPage';
import CitiesPage from './components/ecosystems/CitiesPage/CitiesPage';
import './index.css';
import HomePage from './components/ecosystems/HomePage/HomePage';
import LoginSuccess from './components/ecosystems/HomePage/LoginSuccess';

const theme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          '& span': {
            fontSize: '24px',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: 'lightGray',
          marginTop: '-1px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '24px',
          color: 'rgb(254,80,0)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '56px',
          width: '100%',
          fontSize: '16px',
          border: '2px solid rgb(254,80,0)',
          color: 'rgb(254,80,0)',
          '&:hover': {
            border: '2px solid transparent',
            background:
              'padding-box linear-gradient(to bottom,rgb(255,255,255),rgb(255,255,255)),border-box linear-gradient(to bottom,rgb(254,80,0),rgb(242,141,235))',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          margin: '20px 0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '& label.Mui-focused': {
            color: 'rgb(242,141,235)',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'rgb(242,141,235)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#999999',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            border: '2px solid #999999',
          },
        },
      },
    },
  },
});

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <MapInfoWindowProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="attractions/:cityId" element={<AttractionsPage />} />
              <Route path="/login/success" element={<LoginSuccess />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </MapInfoWindowProvider>
    </ThemeProvider>
  );
};

export default App;
