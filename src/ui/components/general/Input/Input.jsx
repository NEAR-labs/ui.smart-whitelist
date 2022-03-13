import { Box, TextField } from '@mui/material';
import { useStyles } from './Input.styles';
import { ErrorMessage } from '@hookform/error-message';

const Input = ({ type = 'text', register, name, label, errors }) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.input}
        required
        id={`filled-${name}`}
        fullWidth
        type={type}
        label={label}
        variant="filled"
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: 14 },
        }}
        {...register(name)}
      />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          as={<span className="error-message" style={{ color: 'red' }} />}
        />
      )}
    </>
  );
};

export default Input;
