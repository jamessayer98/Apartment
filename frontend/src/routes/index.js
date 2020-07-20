import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Header from '../components/Header';
import ApartmentContainerPage from '../pages/ApartmentContainer';
import ApartmentEditPage from '../pages/ApartmentEdit';
import UserListPage from '../pages/UserList';
import UserEditPage from '../pages/UserEdit';

import AdminRoute from './AdminRoute';
import RealtorRoute from './RealtorRoute';

function Routes () {
  const isLoggedIn = useSelector(state => !!state.auth.user);

  return (
    <Switch>
      <Route exact path='/' render={() => {
        if (isLoggedIn) return (<Redirect to='/apartments' />);
        return (<Redirect to='/login' />);
      }} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      {isLoggedIn && (
        <>
          <Header />
          <Switch>
            <Route path='/apartments' component={ApartmentContainerPage} />
            <AdminRoute path='/users' component={UserListPage} />
            <AdminRoute path='/user' exact component={UserEditPage} />
            <AdminRoute path='/user/:id' component={UserEditPage} />
            <RealtorRoute path='/apartment' exact component={ApartmentEditPage} />
            <RealtorRoute path='/apartment/:id' component={ApartmentEditPage} />
          </Switch>
        </>
      )}
    </Switch>
  );
};

export default Routes;
