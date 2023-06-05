import { FC } from 'react';
// components
import { Grid, Paper, List } from '@mui/material';
// subcomponents
import PlaceListItem from '../atoms/PlaceListItem';

const ListPlaces: FC<{
  places: any[];
  onHandleDelete: (id: string) => void;
}> = ({ places, onHandleDelete }) => {
  return (
    <Grid item xs={112}>
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
          {places?.map((p) => (
            <PlaceListItem
              key={p.id}
              id={p.id}
              onDelete={onHandleDelete}
              place={{ type: p.city ? 'city' : undefined, name: p.city ?? p.attraction }}
            />
          ))}
        </List>
      </Paper>
    </Grid>
  );
};
export default ListPlaces;
