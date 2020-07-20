import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  Drafts,
  Lock,
  LockOpen,
  Person,
} from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

import useStyles from './style';
import { getUser, addUser, updateUser } from '../../store/reducers/user';
import {
  GET_USER_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
} from '../../store/types';
import { requestFail } from '../../utils/request';
import { capitalize } from '../../utils/naming';

function UserEdit() {
  const classes = useStyles();
  const { control, handleSubmit, watch, errors, setValue } = useForm();
  const snackbar = useSnackbar();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const userError = useSelector(state => state.user.error);
  const userStatus = useSelector(state => state.user.status);

  useEffect(() => {
    if (params.id) {
      dispatch(getUser({
        id: params.id,
      }));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('username', user.username);
    setValue('email', user.email);
  }, [user]);

  const onSubmit = (data) => {
    if (params.id) {
      dispatch(updateUser({
        id: params.id,
        body: data,
        success: (res) => {
          snackbar.enqueueSnackbar('Update user successfully', { variant: 'success' });
          history.push('/users');
        },
      }));
    } else {
      dispatch(addUser({
        body: data,
        success: (res) => {
          snackbar.enqueueSnackbar('Create a new user successfully', { variant: 'success' });
          history.push('/users');
        },
      }));
    }
  };

  const isRequestFailed = (status) => {
    return status === requestFail(GET_USER_REQUEST)
      || status === requestFail(ADD_USER_REQUEST)
      || status === requestFail(UPDATE_USER_REQUEST);
  };

  const getErrorText = (error) => {
    if (error.status === 401) return 'Error 401 (Unauthorized)';
    return error ?
      Object.keys(error.data).map((key) => (
        <div key={key}>{`${capitalize(key)}: ${error.data[key]}`}</div>
      )) : '';
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.paper}>
        <Typography component="h1" variant="h4">
          {params.id ? 'Update user' : 'Add a new user'}
        </Typography>
        {isRequestFailed(userStatus) && (
          <Alert className={classes.errorPane} severity="error">
            <AlertTitle>Error</AlertTitle>
            {getErrorText(userError)}
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
            <Grid item xs={12} sm={params.id ? 12 : 6}>
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
            {!params.id && (
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
            )}
            <Grid item xs={12}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    label="Email Address"
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
            {!params.id && (
              <>
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
              </>
            )}
          </Grid>
          <Grid container className={classes.submit}>
            <Grid item xs>
              <Button href='/users' color="primary">
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {params.id ? 'Update' : 'Add'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default UserEdit;
