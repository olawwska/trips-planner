import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import { Grid, Box, Typography } from '@mui/material';
//subcomponents
import ListTitle from '../../atoms/ListTitle';
import NoPlacesPage from '../../molecules/NoPlacesPage';
import TextFieldPlace from '../../atoms/TextFieldPlace';
import ButtonSubmitPlace from '../../atoms/ButtonSubmitPlace';
import CitiesList from './CitiesList';
// API
import useCities from '../../useCities';
import useContext from '../context';

const CitiesPage: FC = () => {
  const { state } = useContext();
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState<string>('');
  const { cities, deleteCity, createCity } = useCities();

  const handleDeleteCity = (cityId: number) => {
    deleteCity(cityId);
  };

  const handleAddCity = () => {
    const payload = { city: inputVal };
    createCity(payload);
    setInputVal('');
  };

  const onHandleClick = (id: number) => {
    return navigate(`/attractions/${id}`);
  };

  return (
    <Grid container display="flex" margin="auto" alignItems="center" height="100vh" width="50vw">
      {Boolean(cities?.length) ? (
        <Grid container>
          <ListTitle title={'Cities list'} />
          <CitiesList
            cities={cities}
            onHandleDelete={handleDeleteCity}
            onHandleClick={onHandleClick}
          />
          <Grid item xs={12}>
            <TextFieldPlace label={'Type a city'} setInputVal={setInputVal} inputVal={inputVal} />
          </Grid>
          <Grid item xs={12}>
            <ButtonSubmitPlace handleSubmit={handleAddCity} text={'Add a city'} />
          </Grid>
        </Grid>
      ) : (
        <NoPlacesPage
          inputVal={inputVal}
          setInputVal={setInputVal}
          label={'Add city'}
          title={
            <Box>
              <Typography
                variant="h2"
                style={{ color: 'rgb(254, 80, 0)', display: 'inline' }}
              >{`Hi ${state.authenticatedUserName}! `}</Typography>
              <Typography variant="h2" style={{ display: 'inline' }}>
                There are no cities added yet
              </Typography>
            </Box>
          }
          onHandleSubmit={handleAddCity}
        />
      )}
    </Grid>
  );
};

export default CitiesPage;
