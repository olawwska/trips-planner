import { FC } from 'react';
// components
import { Grid, Paper, List } from '@mui/material';
// subcomponents
import PlaceListItem from '../../atoms/PlaceListItem';
// types
import { CityType } from 'components/types';

const CitiesList: FC<{
  cities: CityType[];
  onHandleDelete: (id: number) => void;
  onHandleClick: (id: number) => void;
}> = ({ cities, onHandleDelete, onHandleClick }) => {
  return (
    <Grid item xs={12}>
      <Paper
        style={{
          maxHeight: '350px',
          overflow: 'scroll',
          borderColor: 'white',
          marginBottom: '10%',
          marginTop: '2%',
        }}
        variant="outlined"
      >
        <List>
          {cities?.map(({ id, city }) => (
            <PlaceListItem
              key={id}
              id={id}
              onDelete={onHandleDelete}
              name={city}
              onHandleClick={onHandleClick}
            />
          ))}
        </List>
      </Paper>
    </Grid>
  );
};
export default CitiesList;
