import React from 'react';
import { CircularProgress } from '@material-ui/core';

import useStyles from './style';

function LoadingFallback() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  );
}

export default LoadingFallback;
