import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

import ApartmentCard from '../ApartmentCard';
import { isRealtorManageAllowed } from '../../utils/role';
import useStyles from './style.js';

function ApartmentList ({ apartments, onClickApartment }) {
  const classes = useStyles();
  const role = useSelector(state => state.auth.user.role);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {apartments.map(apartment => (
          <Grid key={apartment.id} item sm={6} xs={12}>
            <ApartmentCard
              apartment={apartment}
              actionable={isRealtorManageAllowed(role)}
              onClickApartment={onClickApartment}
            />
          </Grid>
        ))}
        {apartments.length === 0 && (
          <Typography variant="h5">
            No available apartments
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default ApartmentList;
