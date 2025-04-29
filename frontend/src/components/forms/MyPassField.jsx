import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export default function MyPassField({ label, name, control }) {
  const [showPassword, setShowPassword] = React.useState(false);

  if (!control) {
    console.error(`MyPassField: 'control' prop is required for field "${name}"`);
    return null;
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, value = '' },
        fieldState: { error },
      }) => (
        <FormControl
          variant="outlined"
          className="myForm"
          fullWidth
          error={!!error}
        >
          <InputLabel htmlFor={`outlined-adornment-password-${label}`}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={`outlined-adornment-password-${label}`}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            autoComplete="new-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

MyPassField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired
};
