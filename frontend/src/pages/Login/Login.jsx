import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { Alert, AlertTitle } from '@material-ui/lab';

import useStyles from './style';
import { login } from '../../store/reducers/auth';
import { requestFail } from '../../utils/request';
import { LOGIN_REQUEST } from '../../store/types';

function Login () {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const authStatus = useSelector(state => state.auth.status);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login({
      body: data,
      success: () => history.push('/apartments'),
    }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {authStatus === requestFail(LOGIN_REQUEST) && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Invalid username or password
            </Alert>
          )}
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            }
            name="username"
            control={control}
            rules={{
              required: 'Username is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="username" />
          <Controller
            as={
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
            }}
            defaultValue=""
          />
          <ErrorMessage as={<Typography color="error" />} errors={errors} name="password" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
