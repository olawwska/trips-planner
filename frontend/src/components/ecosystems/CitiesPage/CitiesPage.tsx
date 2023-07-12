import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import { Box, Grid } from '@mui/material';
//subcomponents
import ListTitle from '../../atoms/ListTitle';
import NoPlacesPage from '../../molecules/NoPlacesPage';
import TextFieldPlace from '../../atoms/TextFieldPlace';
import ButtonSubmitPlace from '../../atoms/ButtonSubmitPlace';
import CitiesList from './CitiesList';
// API
import useCities from '../../useCities';

const CitiesPage: FC = () => {
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
    <Box sx={{ maxWidth: '50%', margin: 'auto', marginTop: '10%' }}>
      {Boolean(cities?.length) ? (
        <>
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
        </>
      ) : (
        <NoPlacesPage
          inputVal={inputVal}
          setInputVal={setInputVal}
          label={'Add city'}
          title={'There are no cities added yet'}
          onHandleSubmit={handleAddCity}
        />
      )}
    </Box>
  );
};

export default CitiesPage;
