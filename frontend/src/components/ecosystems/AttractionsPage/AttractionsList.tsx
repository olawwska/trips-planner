import { FC } from 'react';
// components
import { Grid, Paper, List } from '@mui/material';
// subcomponents
import PlaceListItem from '../../atoms/PlaceListItem';
//types
import { IAttractionType } from 'components/types';
// context
import useContext from '../context';

const AttractionsList: FC<{
  attractions: IAttractionType[];
  onHandleDelete: (id: number) => void;
}> = ({ attractions, onHandleDelete }) => {
  const { dispatch } = useContext();

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
          {attractions?.map(({ id, attraction, lat, lng, photo, website, rating }) => (
            <PlaceListItem
              key={id}
              id={id}
              onDelete={onHandleDelete}
              name={attraction || ''}
              onHandleFocus={() => {
                dispatch({
                  type: 'CHANGE_ALL_ATTRACTION_INFO',
                  id: id,
                  lat: lat,
                  lng: lng,
                  photo: photo,
                  website: website,
                  rating: rating,
                  isOpen: true,
                });
              }}
              onHandleMouseOut={() => {
                dispatch({ type: 'CLOSE_INFO_WINDOW' });
              }}
            />
          ))}
        </List>
      </Paper>
    </Grid>
  );
};
export default AttractionsList;
