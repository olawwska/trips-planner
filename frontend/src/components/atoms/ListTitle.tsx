import { FC } from 'react';
// components
import { Grid, Typography } from '@mui/material';

const ListTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h2">{title}</Typography>
    </Grid>
  );
};

export default ListTitle;
