import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';

import useStyles from './style';
import { isAdmin } from '../../utils/role';
import { logout } from '../../store/reducers/auth';

function Header() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavLink className={classes.logo} to="/">Apartment Rentals</NavLink>
        <div className={classes.flexGrow} />
        <NavLink
          className={classes.link}
          activeClassName={classes.activeLink}
          to='/apartments'
          exact={true}
        >
          <Button color="inherit">Apartments</Button>
        </NavLink>
        {isAdmin(user.role) && (
          <NavLink
            className={classes.link}
            activeClassName={classes.activeLink}
            to='/users'
            exact={true}
          >
            <Button color="inherit">Users</Button>
          </NavLink>
        )}
        <IconButton aria-label="logout" color="inherit" onClick={handleLogout}>
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
