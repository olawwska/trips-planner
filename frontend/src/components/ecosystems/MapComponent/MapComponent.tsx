import { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
// components
import { Grid } from '@mui/material';
// subcomponents
import MapInfoWindow from './MapInfoWindow';
import TextFieldPlace from '../../atoms/TextFieldPlace';
// API
import useCoordinates from 'components/useCoordinates';
import useAttractions from '../../useAttractions';
// types
import { CityType, IPlaceType, IAttractionType } from 'components/types';
// styles
import useStyles from '../useStyles';
// context
import useContext from '../context';

const placesLibrary: 'places'[] = ['places'];

const MapComponent: FC<{ selectedCity: CityType; attractions: IAttractionType[] }> = ({
  selectedCity,
  attractions,
}) => {
  const classes = useStyles();
  const { state: infoWindowData, dispatch } = useContext();
  const { cityId = '' } = useParams();
  const [inputVal, setInputVal] = useState('');

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

  const handleAddAttraction = (placeInfo: IPlaceType) => {
    const attraction = {
      attraction: placeInfo.name,
      cityId: parseInt(cityId),
      lat: placeInfo.lat,
      lng: placeInfo.lng,
      photo: placeInfo?.photo,
      website: placeInfo?.website,
    };
    addAttraction(attraction);
    setInputVal('');
  };

  const [searchResult, setSearchResult] = useState<any>('');

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onLoadMap = (map) => {
    setMapRef(map);
    if (attractions?.length) {
      const bounds = new google.maps.LatLngBounds();
      attractions.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
    }
  };

  const onPlaceChanged = () => {
    if (searchResult) {
      const place = searchResult.getPlace();
      const placeInfo: IPlaceType = {
        name: place.name,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
        photo: place.photos[0]?.getUrl(),
        attraction: place.attraction,
        website: place.website,
      };
      handleAddAttraction(placeInfo);
    }
  };

  const [mapRef, setMapRef] = useState<any>();

  const handleMarkerClick = ({
    attractionId,
    lat,
    lng,
    photo,
    attraction,
    website,
  }: IAttractionType) => {
    mapRef?.panTo({ lat, lng });
    dispatch({
      type: 'CHANGE_ALL_ATTRACTION_INFO',
      attractionId: attractionId,
      lat: lat,
      lng: lng,
      photo: photo,
      attraction: attraction,
      website: website,
      isOpen: true,
    });
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
            <TextFieldPlace setInputVal={setInputVal} inputVal={inputVal} mapTextField />
          </Autocomplete>
          {attractions.map(({ lat, lng, attractionId, photo, attraction, website }) => (
            <MarkerF
              key={attractionId}
              position={{ lat: lat, lng: lng }}
              onClick={() => {
                handleMarkerClick({ attractionId, lat, lng, photo, attraction, website });
              }}
            >
              {infoWindowData.isOpen && infoWindowData?.attractionId === attractionId && (
                <InfoWindowF
                  onCloseClick={() => {
                    dispatch({ type: 'CLOSE_INFO_WINDOW' });
                  }}
                  position={{ lat: lat, lng: lng }}
                >
                  <MapInfoWindow infoWindowData={infoWindowData} />
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </Grid>
  );
};

export default MapComponent;
