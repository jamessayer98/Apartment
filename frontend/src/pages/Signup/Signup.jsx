import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  Drafts,
  Lock,
  LockOpen,
  LockOutlined,
  Person,
} from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';

import useStyles from './style';
import { signup } from '../../store/reducers/auth';
import { requestFail } from '../../utils/request';
import { capitalize } from '../../utils/naming';
import { SIGNUP_REQUEST } from '../../store/types';

export default function SignUp() {
  const classes = useStyles();
  const { control, handleSubmit, watch, errors, setValue } = useForm();
  const authStatus = useSelector(state => state.auth.status);
  const authError = useSelector(state => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    delete data['confirmPassword'];
    dispatch(signup({
      body: data,
      success: () => history.push('/login'),
    }));
  };

  const getErrorText = () => {
    return authError ?
      Object.keys(authError.data).map((key) => (
        <div key={key}>{`${capitalize(key)}: ${authError.data[key]}`}</div>
      )) : '';
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {authStatus === requestFail(SIGNUP_REQUEST) && (
            <Alert className={classes.errorPane} severity="error">
              <AlertTitle>Error</AlertTitle>
              {getErrorText()}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                }
                name="firstName"
                control={control}
                rules={{
                  required: 'First name is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="firstName" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
                name="lastName"
                control={control}
                rules={{
                  required: 'Last name is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="lastName" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    label="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <>
                    <InputLabel className={classes.label}>Role</InputLabel>
                    <Select
                      className={classes.select}
                      onChange={(event) => setValue('role', event.target.value)}
                      native
                    >
                      <option value="CLIENT">Client</option>
                      <option value="REALTOR">Realtor</option>
                    </Select>
                  </>
                }
                name="role"
                control={control}
                rules={{
                  required: 'Role is required',
                }}
                defaultValue="CLIENT"
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="role" />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Drafts />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    label="Confirm password"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpen />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
                name="confirmPassword"
                control={control}
                rules={{
                  validate: (value) => value === watch('password') || 'The password is not matched'
                }}
                defaultValue=""
              />
              <ErrorMessage as={<Typography color="error" />} errors={errors} name="confirmPassword" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
