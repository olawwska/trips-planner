import { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadScript, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
// components
import { Grid, Typography } from '@mui/material';
// subcomponents
import TextFieldPlace from '../atoms/TextFieldPlace';
import ListTitle from '../atoms/ListTitle';
import ListPlaces from '../molecules/ListPlaces';
// API
import useAttractions from '../useAttractions';
import useCities from '../useCities';
import useCoordinates from 'useCoordinates';
// styles
import useStyles from './useStyles';

const placesLibrary: 'places'[] = ['places'];

const AttractionsList: FC = () => {
  const classes = useStyles();
  const { cityId } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY ?? '',
    libraries: placesLibrary,
  });
  const [inputVal, setInputVal] = useState('');

  const { useGetAllAttractions, deleteAttraction, addAttraction } = useAttractions();
  const attractions = useGetAllAttractions(cityId);

  const { useGetCityById } = useCities();
  const selectedCity = useGetCityById(cityId);

  const { useGetCityCoordinates } = useCoordinates();
  const { coordinates } = useGetCityCoordinates(selectedCity?.city);
  const { lat, lng } = coordinates?.results[0].geometry?.location || {};

  const center = useMemo(
    () => ({
      lat: lat,
      lng: lng,
    }),
    [lat, lng]
  );

  const handleDeleteAttraction = (id: string) => {
    deleteAttraction(id);
  };

  const handleAddAttraction = (placeCoordinates) => {
    const attraction = {
      attraction: placeCoordinates.name,
      cityId: cityId ?? '',
      lat: placeCoordinates.lat,
      lng: placeCoordinates.lng,
    };
    addAttraction(attraction);
    setInputVal('');
  };

  const [searchResult, setSearchResult] = useState<any>('');

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult) {
      const place = searchResult.getPlace();
      const placeCoordinates = {
        name: place.name,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      };
      handleAddAttraction(placeCoordinates);
    }
  };

  return (
    <Grid container>
      <Grid item xs={6} style={{ height: '100vh', marginTop: '10%', padding: '0 5%' }}>
        <ListTitle title={`${selectedCity?.city} attractions list`} />
        {Boolean(attractions?.length) ? (
          <ListPlaces places={attractions} onHandleDelete={handleDeleteAttraction} />
        ) : (
          <>
            <Typography variant="h2" align="center">
              There are no attractions added to this city yet
            </Typography>
            <Typography variant="h5" align="center" sx={{ marginTop: '2%' }}>
              Click below if you want to add one
            </Typography>
          </>
        )}
      </Grid>
      <Grid item xs={6} style={{ height: '100vh' }}>
        {!isLoaded ? (
          <>isLoading</>
        ) : (
          <GoogleMap mapContainerClassName={classes.map} center={center} zoom={10}>
            <Autocomplete
              onLoad={onLoad}
              //@ts-ignore
              onPlaceChanged={(place) => onPlaceChanged(place)}
            >
              <TextFieldPlace setInputVal={setInputVal} inputVal={inputVal} />
            </Autocomplete>
            {attractions?.map((m) => (
              <Marker position={{ lat: m.lat, lng: m.lng }} />
            ))}
          </GoogleMap>
        )}
      </Grid>
    </Grid>
  );
};

export default AttractionsList;
