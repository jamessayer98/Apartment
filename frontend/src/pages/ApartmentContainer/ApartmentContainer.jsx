import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Alert, AlertTitle } from '@material-ui/lab';

import useStyles from './style';
import LoadingFallback from '../../components/LoadingFallback';
import { ApartmentMap } from '../../components/ApartmentMap';
import ApartmentHeader from '../../components/ApartmentHeader';
import ApartmentList from '../../components/ApartmentList';
import ApartmentFilter from '../../components/ApartmentFilter';
import useDebounce from '../../utils/useDebounce';
import { requestFail, requestPending } from '../../utils/request';
import { getApartments } from '../../store/reducers/apartment';
import { GET_APARTMENTS_REQUEST } from '../../store/types';
import { isRealtorManageAllowed } from '../../utils/role';
import { capitalize } from '../../utils/naming';

function ApartmentContainer () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const apartments = useSelector(state => state.apartment.apartments);
  const role = useSelector(state => state.auth.user.role);
  const apartmentError = useSelector(state => state.apartment.error);
  const apartmentStatus = useSelector(state => state.apartment.status);
  const [infoWindowOpen, setInfoWindowOpen] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [filterParams, setFilterParams] = useState({
    price: [10, 10000],
    size: [100, 5000],
    rooms: [1, 100],
  });
  const debouncedFilterParams = useDebounce(filterParams, 500);

  useEffect(() => {
    dispatch(getApartments({
      params: filterParams,
    }));
  }, []);

  useEffect(() => {
    if (apartments.length === 0) return;
    setInfoWindowOpen(new Array(apartments.length).fill(false));

    if (apartments.length > 0 && apartments.length % rowsPerPage === 0 && apartments.length / rowsPerPage <= page - 1) {
      setPage(page - 1);
    }
  }, [apartments]);

  useEffect(() => {
    if (debouncedFilterParams) {
      dispatch(getApartments({
        params: filterParams,
      }));
    }
  }, [debouncedFilterParams]);

  const toggleOpenInfoWindow = (index) => {
    const newInfoWindowOpen = new Array(apartments.length).fill(false);
    newInfoWindowOpen[index] = !infoWindowOpen[index];
    setInfoWindowOpen(newInfoWindowOpen);
  }

  const handleChangeFilterParams = (name, value) => {
    setFilterParams({
      ...filterParams,
      [name]: value,
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setInfoWindowOpen(new Array(apartments.length).fill(false));
  };

  const handleClickApartment = (apartmentId) => {
    const apartmentIndex = apartments
      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
      .findIndex(apartment => apartment.id === apartmentId);
    if (apartmentIndex < 0) return;

    const newInfoWindowOpen = new Array(apartments.length).fill(false);
    newInfoWindowOpen[apartmentIndex] = true;
    setInfoWindowOpen(newInfoWindowOpen);
  };

  const getErrorText = (error) => {
    if (error.status === 401) return 'Error 401 (Unauthorized)';
    return error ?
      Object.keys(error.data).map((key) => (
        <div key={key}>{`${capitalize(key)}: ${error.data[key]}`}</div>
      )) : '';
  };

  const renderContent = () => {
    if (apartmentStatus === requestPending(GET_APARTMENTS_REQUEST)) return <LoadingFallback />;
    if (apartmentStatus === requestFail(GET_APARTMENTS_REQUEST)) {
      return (
        <Alert className={classes.errorPane} severity="error">
          <AlertTitle>Error</AlertTitle>
          {getErrorText(apartmentError)}
        </Alert>
      );
    }

    return (
      <>
        <ApartmentList
          apartments={apartments.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
          onClickApartment={handleClickApartment}
        />
        <div className={classes.pagination}>
          <Pagination count={Math.ceil(apartments.length / rowsPerPage) || 1} page={page} onChange={handlePageChange} />
        </div>
      </>      
    );
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={4}>
        <Grid className={classes.noPadding} item md={6}>
          <ApartmentMap
            apartments={apartments}
            actionable={isRealtorManageAllowed(role)}
            isOpen={infoWindowOpen}
            onToggleOpen={toggleOpenInfoWindow}
          />
        </Grid>
        <Grid className={classes.noPadding} item md={6} style={{position: 'relative'}}>
          <ApartmentHeader />
          <ApartmentFilter filterParams={filterParams} onChangeFilterParams={handleChangeFilterParams}/>
          {renderContent()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ApartmentContainer;
