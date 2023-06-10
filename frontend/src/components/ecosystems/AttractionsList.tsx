import { FC } from 'react';
import { useParams } from 'react-router-dom';
// components
import { Grid, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// subcomponents
import ListTitle from '../atoms/ListTitle';
import ListPlaces from '../molecules/ListPlaces';
import MapComponent from './MapComponent/MapComponent';
// API
import useAttractions from '../useAttractions';
import useCities from '../useCities';

const AttractionsList: FC = () => {
  const { cityId } = useParams();
  const { useGetAllAttractions, deleteAttraction } = useAttractions();
  const { data: attractions, isLoading: areAttractionsLoading } = useGetAllAttractions(cityId);

  const { useGetCityById } = useCities();
  const selectedCity = useGetCityById(cityId);

  const handleDeleteAttraction = (id: string) => {
    deleteAttraction(id);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={6}
        style={{
          marginTop: '10%',
          padding: '0 5%',
        }}
      >
        <ListTitle title={`${selectedCity?.city} attractions list`} />
        {Boolean(attractions?.length) ? (
          <ListPlaces places={attractions} onHandleDelete={handleDeleteAttraction} />
        ) : (
          <>
            <Typography variant="h2" align="center" sx={{ margin: '10% 0' }}>
              There are no attractions added to this city yet
            </Typography>
            <Grid container alignItems="end" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" align="center" sx={{ marginTop: '2%' }}>
                  Enter a location if you want to add one
                </Typography>
              </Grid>
              <Grid item>
                <ChevronRightIcon style={{ fontSize: '32px', marginTop: '2px' }} />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      {!areAttractionsLoading && (
        <MapComponent selectedCity={selectedCity} attractions={attractions} />
      )}
    </Grid>
  );
};

export default AttractionsList;
