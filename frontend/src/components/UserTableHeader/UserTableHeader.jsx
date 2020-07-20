import React from 'react';
import {
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';

import useStyles from './style';

function UserTableHeader({ onAddUser }) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h4">
        All Users
      </Typography>
      <Button variant="contained" color="primary" onClick={onAddUser}>
        Add User
      </Button>
    </Toolbar>
  );
}

export default UserTableHeader;
