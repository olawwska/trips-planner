import React, { FC } from 'react';
// components
import { Grid, Typography } from '@mui/material';
// sub-components
import TextFieldPlace from '../atoms/TextFieldPlace';
import ButtonSubmitPlace from '../atoms/ButtonSubmitPlace';

const NoPlacesPage: FC<{
  inputVal: string;
  setInputVal: (val: string) => void;
  label: string;
  title: React.ReactNode;
  onHandleSubmit: () => void;
}> = ({ inputVal, setInputVal, label, title, onHandleSubmit }) => {
  return (
    <Grid container display="flex" justifyContent="center" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h2" align="center">
          {title}
        </Typography>
        <Typography variant="h5" align="center" sx={{ marginTop: '2%' }}>
          Click below if you want to add one
        </Typography>
        <Grid item xs={12}>
          <TextFieldPlace label={label} inputVal={inputVal} setInputVal={setInputVal} />
        </Grid>
        <ButtonSubmitPlace text={label} handleSubmit={onHandleSubmit} />
      </Grid>
    </Grid>
  );
};

export default NoPlacesPage;
