import * as React from 'react';
import '../../App.css'
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'
import PropTypes from 'prop-types';

export default function MyTextField(props) {
  const {label, name, control} = props;
  
  if (!control) {
    console.error(`MyTextField: 'control' prop is required for field "${name}"`);
    return null;
  }

  return (
     <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({
            field:{onChange, value}, 
            fieldState:{error},
            formState,
        }) => (
          <TextField 
            id={`field-${name}`}  
            onChange={onChange}
            value={value ?? ''}
            label={label}
            variant="outlined" 
            className={"myForm"}
            error={!!error}
            helperText={error?.message}
          />
        )}
     />
  );
}

MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired
};