import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
// components
import { Box, Grid } from '@mui/material';
// subcomponents
import TextFieldPlace from '../atoms/TextFieldPlace';
import ButtonSubmitPlace from '../atoms/ButtonSubmitPlace';
import ListTitle from '../atoms/ListTitle';
import ListPlaces from '../molecules/ListPlaces';
import NoPlacesPage from '../molecules/NoPlacesPage';
// API
import useAttractions from '../useAttractions';
import useCities from '../useCities';

const AttractionsList: FC = () => {
  const [inputVal, setInputVal] = useState('');
  const { cityId } = useParams();

  const { useGetAllAttractions, deleteAttraction, addAttraction } = useAttractions();

  const attractions = useGetAllAttractions(cityId);
  const { cities } = useCities();

  const titleText = cityId && cities && cities.find((c) => c.id === parseInt(cityId)).city;

  const handleDeleteAttraction = (id: string) => {
    deleteAttraction(id);
  };

  const handleAddAttraction = () => {
    const attraction = { attraction: inputVal, cityId: cityId ?? '' };
    addAttraction(attraction);
    setInputVal('');
  };

  return (
    <Box
      sx={{
        width: '50%',
        margin: '0 auto',
        marginTop: '15%',
      }}
    >
      {Boolean(attractions?.length) ? (
        <>
          <ListTitle title={`${titleText} attractions list`} />
          <ListPlaces places={attractions} onHandleDelete={handleDeleteAttraction} />
          <Grid item xs={12}>
            <TextFieldPlace
              label={'Type an attraction'}
              setInputVal={setInputVal}
              inputVal={inputVal}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonSubmitPlace handleSubmit={handleAddAttraction} text={'Add an attraction'} />
          </Grid>
        </>
      ) : (
        <NoPlacesPage
          inputVal={inputVal}
          setInputVal={setInputVal}
          label={'Add attraction'}
          title={'There are no attractions added to this city yet'}
          onHandleSubmit={handleAddAttraction}
        />
      )}
    </Box>
  );
};

export default AttractionsList;
