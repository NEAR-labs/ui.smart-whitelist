import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../config/api';
import TextField from '@mui/material/TextField';
import { ErrorMessage } from '@hookform/error-message';
import { useStyles } from '../Input/Input.styles';

const CountrySelect = ({ control, errors }) => {
  const [countries, setCountries] = useState([]);

  const loadCountries = async () => {
    const response = await api.getCountries();
    if (response.length > 0) {
      const supportedIdentityReport = response.filter(
        (item) => item.supported_identity_report === true,
      );
      setCountries(supportedIdentityReport);
    }
  };

  useEffect(() => {
    loadCountries();
    return () => {
      setCountries([]);
    };
  }, []);

  const classes = useStyles();

  return (
    <Controller
      name={'address.country'}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          onChange={(_, data) => {
            onChange(data?.alpha3 ?? '');
            return data;
          }}
          defaultValue={null}
          id="country"
          style={{ width: '100%' }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.alpha3 === value.alpha3}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label="Choose a country"
                variant="filled"
                fullWidth
                className={classes.input}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
              {errors && (
                <ErrorMessage
                  errors={errors}
                  name="address.country"
                  as={<span className="error-message" style={{ color: 'red' }} />}
                />
              )}
            </>
          )}
        />
      )}
    />
  );
};

export default CountrySelect;
