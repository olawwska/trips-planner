import { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadScript, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import { debounce } from 'lodash';
// components
import { Grid } from '@mui/material';
// subcomponents
import TextFieldPlace from '../atoms/TextFieldPlace';
// API
import useCoordinates from 'useCoordinates';
import useAttractions from '../useAttractions';
// types
import { CityType, AttractionType } from 'components/types';
// styles
import useStyles from './useStyles';

const placesLibrary: 'places'[] = ['places'];

const MapComponent: FC<{ selectedCity: CityType; attractions: AttractionType[] }> = ({
  selectedCity,
  attractions,
}) => {
  const classes = useStyles();
  const { cityId } = useParams();
  const [inputVal, setInputVal] = useState('');
  const [markers, setMarkers] = useState<any[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY ?? '',
    libraries: placesLibrary,
  });

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

  const { addAttraction } = useAttractions();

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
  const onLoadMap = (map) => {
    debounce(() => {
      setMarkers(attractions);
    }, 20)();
    const bounds = new google.maps.LatLngBounds();
    attractions.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
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
    <Grid item xs={6} style={{ height: '100vh' }}>
      {!isLoaded ? (
        <>isLoading</>
      ) : (
        <GoogleMap mapContainerClassName={classes.map} center={center} zoom={10} onLoad={onLoadMap}>
          <Autocomplete
            onLoad={onLoad}
            //@ts-ignore
            onPlaceChanged={(place) => onPlaceChanged(place)}
          >
            <TextFieldPlace setInputVal={setInputVal} inputVal={inputVal} />
          </Autocomplete>
          {markers.map(({ lat, lng, id }) => (
            <Marker key={id} position={{ lat, lng }} onMouseOver={() => console.log(id)}></Marker>
          ))}
        </GoogleMap>
      )}
    </Grid>
  );
};

export default MapComponent;
