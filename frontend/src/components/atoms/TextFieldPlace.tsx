import { FC } from 'react';
// components
import { TextField, InputAdornment } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';

const TextFieldPlace: FC<{
  label?: string;
  inputVal: string;
  setInputVal: (val: string) => void;
}> = ({ label, inputVal, setInputVal }) => {
  return (
    <TextField
      label={label}
      value={inputVal}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyboardIcon style={{ color: '#999999' }} />
          </InputAdornment>
        ),
      }}
      onChange={(event) => {
        let { value } = event.target;
        setInputVal(value);
      }}
    />
  );
};
export default TextFieldPlace;
