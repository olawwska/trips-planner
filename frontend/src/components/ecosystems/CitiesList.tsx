import { FC, useState } from 'react';
//components
import { Box, Grid } from '@mui/material';
//subcomponents
import ListTitle from '../atoms/ListTitle';
import NoPlacesPage from '../molecules/NoPlacesPage';
import TextFieldPlace from '../atoms/TextFieldPlace';
import ButtonSubmitPlace from '../atoms/ButtonSubmitPlace';
import ListPlaces from '../molecules/ListPlaces';
// API
import useCities from '../useCities';

const HomeComponent: FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const { cities, deleteCity, createCity } = useCities();

  const handleDeleteCity = (id: string) => {
    deleteCity(id);
  };

  const handleAddCity = () => {
    const payload = { city: inputVal };
    createCity(payload);
    setInputVal('');
  };

  return (
    <Box sx={{ maxWidth: '50%', margin: 'auto', marginTop: '10%' }}>
      {Boolean(cities?.length) ? (
        <>
          <ListTitle title={'Cities list'} />
          <ListPlaces places={cities} onHandleDelete={handleDeleteCity} />
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

export default HomeComponent;
