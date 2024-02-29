import React, { useState } from 'react';
import { Button, Grid, TextField, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { checkingAuthentication } from '../../store/endpoints';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      dispatch(checkingAuthentication(username, password));
      // const data = await login(username, password).unwrap();
    } catch (e) {
    }
  };

  

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{mb: 2}}>
            <TextField
              label="Username"
              type="text"
              placeholder="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid container spacing={2} sx={{mb:2, mt: 2}}>
            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' fullWidth >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link component={RouterLink} to="/auth/register" underline="none" color="inherit">
                <Button variant='contained' fullWidth>
                  Register
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
