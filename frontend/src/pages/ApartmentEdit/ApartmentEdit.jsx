import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

import { ApartmentMapWithCenter as ApartmentMap } from '../../components/ApartmentMap';
import ApartmentForm from '../../components/ApartmentForm';
import { getApartment, addApartment, updateApartment } from '../../store/reducers/apartment';
import {
  GET_APARTMENT_REQUEST,
  ADD_APARTMENT_REQUEST,
  UPDATE_APARTMENT_REQUEST,
} from '../../store/types';
import { requestSuccess, requestFail } from '../../utils/request';
import { capitalize } from '../../utils/naming';

import useStyles from './style';

function ApartmentEdit () {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const apartment = useSelector(state => state.apartment.apartment);
  const apartmentStatus = useSelector(state => state.apartment.status);
  const apartmentError = useSelector(state => state.apartment.error);
  const [latLng, setLatLng] = useState();

  useEffect(() => {
    if (params.id) {
      dispatch(getApartment({
        id: params.id,
      }));
    }
  }, []);

  useEffect(() => {
    if (!apartment || apartmentStatus !== requestSuccess(GET_APARTMENT_REQUEST)) return;
    setLatLng({
      lat: apartment.latitude,
      lng: apartment.longitude,
    });
  }, [apartment]);

  const handleSubmit = (data) => {
    if (params.id) {
      dispatch(updateApartment({
        id: params.id,
        body: data,
        success: (res) => {
          snackbar.enqueueSnackbar('Update apartment successfully', { variant: 'success' });
          history.goBack();
        },
      }));
    } else {
      dispatch(addApartment({
        body: data,
        success: (res) => {
          snackbar.enqueueSnackbar('Create a new apartment successfully', { variant: 'success' });
          history.goBack();
        },
      }));
    }
  };

  const isRequestFailed = (status) => {
    return status === requestFail(GET_APARTMENT_REQUEST)
      || status === requestFail(ADD_APARTMENT_REQUEST)
      || status === requestFail(UPDATE_APARTMENT_REQUEST);
  };

  const getErrorText = (error) => {
    if (error.status === 401) return 'Error 401 (Unauthorized)';
    return error ?
      Object.keys(error.data).map((key) => (
        <div key={key}>{`${capitalize(key)}: ${error.data[key]}`}</div>
      )) : '';
  };

  return (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid className={classes.noPadding} item md={6}>
          <ApartmentMap position={latLng} />
        </Grid>
        <Grid className={classes.noPadding} item md={6}>
          <Box className={classes.paper}>
            <Typography variant="h4">
              {params.id ? 'Edit apartment' : 'Add a new apartment'}
            </Typography>
            {isRequestFailed(apartmentStatus) && (
              <Alert className={classes.errorPane} severity="error">
                <AlertTitle>Error</AlertTitle>
                {getErrorText(apartmentError)}
              </Alert>
            )}
            <ApartmentForm
              latLng={latLng}
              apartment={apartment}
              setLatLng={setLatLng}
              onSubmit={handleSubmit}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ApartmentEdit;
