import { FC } from 'react';
import { Button } from '@mui/material';

const ButtonSubmitPlace: FC<{ handleSubmit: () => void; text?: string }> = ({
  handleSubmit,
  text = 'SUBMIT',
}) => {
  return (
    <Button variant="outlined" onClick={handleSubmit}>
      {text}
    </Button>
  );
};

export default ButtonSubmitPlace;
