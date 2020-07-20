import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@material-ui/core';

import useStyles from './style';
import { isRealtorManageAllowed } from '../../utils/role';

function ApartmentHeader() {
  const classes = useStyles();
  const history = useHistory();
  const role = useSelector(state => state.auth.user.role);

  return (
    <Box className={classes.root}>
      <Typography variant="h4">
        Available apartments
      </Typography>
      {isRealtorManageAllowed(role) && (
        <Button variant="contained" color="primary" onClick={() => history.push('/apartment')}>
          Add apartment
        </Button>
      )}
    </Box>
  );
}

export default ApartmentHeader;
