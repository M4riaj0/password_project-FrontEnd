import React, { useState, useEffect } from 'react';
import {
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../../auth/layout/AuthLayout';
import { createPassword, updatePassword } from '../../store/endpoints';

export const PasswordForm = ({ id, onClose }) => {
  const [idPassword, setIdPassword] = useState(null);
  const [length, setLength] = useState(0);
  const [mayus, setMayus] = useState(false);
  const [minus, setMinus] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const passwordDetails = useSelector(state => state.auth.passwordDetails);

  useEffect(() => {
    // Update form fields with password details when available
    if (passwordDetails) {
      setIdPassword(passwordDetails.id_password);
      setLength(passwordDetails.length);
      setMayus(passwordDetails.mayus);
      setMinus(passwordDetails.minus);
      setNumbers(passwordDetails.numbers);
      setSymbols(passwordDetails.symbols);
    }
  }, [passwordDetails]);

  const onSubmit = () => {
    const formData = {
      id_password: id, // Include id_password in the form data
      length,
      mayus,
      minus,
      numbers,
      symbols,
    };

    if (id) {
      dispatch(updatePassword(id, formData));
    }else{
      dispatch(createPassword(formData));
    }
    onClose();
  };

  return (
    <form>
      <Grid container direction="column" alignItems="center" spacing={2} style={{ marginTop: '20px' }}>
        <FormControlLabel
          control={<Checkbox checked={mayus} onChange={(e) => setMayus(e.target.checked)} />}
          label="Upper case"
        />
        <FormControlLabel
          control={<Checkbox checked={minus} onChange={(e) => setMinus(e.target.checked)} />}
          label="Lower case"
        />
        <FormControlLabel
          control={<Checkbox checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />}
          label="Numbers"
        />
        <FormControlLabel
          control={<Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />}
          label="Symbols"
        />
        <TextField
          label="Length"
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          style={{ width: 120, marginTop: 10 }}
        />
        <Grid item>
          <Button variant="contained" onClick={onSubmit} fullWidth>
            {editing ? 'Update Password' : 'Generate Password'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
