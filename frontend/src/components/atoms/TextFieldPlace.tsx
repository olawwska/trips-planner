import { FC } from 'react';
// components
import { TextField, InputAdornment } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';

const TextFieldPlace: FC<{
  label?: string;
  inputVal: string;
  setInputVal: (val: string) => void;
  mapTextField?: boolean;
}> = ({ label, inputVal, setInputVal, mapTextField }) => {
  return (
    <TextField
      sx={mapTextField ? { width: '60%', marginLeft: '30%', top: '-12px' } : {}}
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
