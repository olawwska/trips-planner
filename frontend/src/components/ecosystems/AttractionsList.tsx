import { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
// components
import { Grid } from '@mui/material';
// subcomponents
import TextFieldPlace from '../atoms/TextFieldPlace';
import ButtonSubmitPlace from '../atoms/ButtonSubmitPlace';
import ListTitle from '../atoms/ListTitle';
import ListPlaces from '../molecules/ListPlaces';
import NoPlacesPage from '../molecules/NoPlacesPage';
// API
import useAttractions from '../useAttractions';
import useCities from '../useCities';
// styles
import useStyles from './useStyles';

const AttractionsList: FC = () => {
  const classes = useStyles();
  const { isLoaded } = useLoadScript({
    // @ts-ignore
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  const center = useMemo(
    () => ({
      lat: 40.73061,
      lng: -73.935242,
    }),
    []
  );
  const [inputVal, setInputVal] = useState('');
  const { cityId } = useParams();

  const { useGetAllAttractions, deleteAttraction, addAttraction } = useAttractions();

  const attractions = useGetAllAttractions(cityId);
  const { cities } = useCities();

  const titleText = cityId && cities && cities.find((c) => c.id === parseInt(cityId)).city;

  const handleDeleteAttraction = (id: string) => {
    deleteAttraction(id);
  };

  const handleAddAttraction = () => {
    const attraction = { attraction: inputVal, cityId: cityId ?? '' };
    addAttraction(attraction);
    setInputVal('');
  };

  return (
    <Grid container>
      <Grid item xs={6} style={{ height: '100vh', marginTop: '10%', padding: '0 5%' }}>
        {Boolean(attractions?.length) ? (
          <>
            <ListTitle title={`${titleText} attractions list`} />
            <ListPlaces places={attractions} onHandleDelete={handleDeleteAttraction} />
            <Grid item xs={12}>
              <TextFieldPlace
                label={'Type an attraction'}
                setInputVal={setInputVal}
                inputVal={inputVal}
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonSubmitPlace handleSubmit={handleAddAttraction} text={'Add an attraction'} />
            </Grid>
          </>
        ) : (
          <NoPlacesPage
            inputVal={inputVal}
            setInputVal={setInputVal}
            label={'Add attraction'}
            title={'There are no attractions added to this city yet'}
            onHandleSubmit={handleAddAttraction}
          />
        )}
      </Grid>
      <Grid item xs={6} style={{ height: '100vh' }}>
        {!isLoaded ? (
          <>isLoading</>
        ) : (
          <GoogleMap mapContainerClassName={classes.map} center={center} zoom={10}></GoogleMap>
        )}
      </Grid>
    </Grid>
  );
};

export default AttractionsList;
