import { FC } from 'react';
// components
import { Grid, Paper, List } from '@mui/material';
// subcomponents
import PlaceListItem from '../../atoms/PlaceListItem';
//types
import { IAttractionType } from 'components/types';

const AttractionsList: FC<{
  attractions: IAttractionType[];
  onHandleDelete: (id: number) => void;
}> = ({ attractions, onHandleDelete }) => {
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
          {attractions?.map(({ id, attraction }) => (
            <PlaceListItem key={id} id={id} onDelete={onHandleDelete} name={attraction || ''} />
          ))}
        </List>
      </Paper>
    </Grid>
  );
};
export default AttractionsList;
