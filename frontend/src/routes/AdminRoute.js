import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { isAdmin } from '../utils/role';

function AdminRoute (props) {
  const { component: Component, ...rest } = props;
  const user = useSelector(state => state.auth.user);

  return (
    <Route
      {...rest}
      render={() => {
        if (isAdmin(user.role)) return (<Component {...props} />);
        return (<Redirect to='/apartments' />);
      }}
    />
  );
}

export default AdminRoute;
