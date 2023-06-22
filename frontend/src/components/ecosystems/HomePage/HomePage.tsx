import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import { Grid } from '@mui/material';
// sub-components
import ListTitle from 'components/atoms/ListTitle';
import TextFieldPlace from 'components/atoms/TextFieldPlace';
import ButtonSubmitPlace from 'components/atoms/ButtonSubmitPlace';
import useUsers from 'components/useUsers';

const HomePage: FC<{ setToken: (email: string) => void }> = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { addUser } = useUsers();

  return (
    <Grid container sx={{ width: '50%', margin: '15% auto' }}>
      <Grid item xs={12}>
        <ListTitle title="TYPE YOUR EMAIL" />
      </Grid>
      <Grid item xs={12}>
        <TextFieldPlace inputVal={email} setInputVal={setEmail} />
      </Grid>
      <Grid item xs={12}>
        <ButtonSubmitPlace
          text="SUBMIT"
          handleSubmit={() => {
            if (email) {
              setToken(email);
              addUser({ userEmail: email });
              navigate('/cities');
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
