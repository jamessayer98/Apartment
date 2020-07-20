import { createAction, createReducer } from '@reduxjs/toolkit';

import { LOGIN_REQUEST, SIGNUP_REQUEST, LOGOUT_REQUEST } from '../types';
import { requestSuccess, requestFail } from '../../utils/request';

const getInitialState = () => {
  const authInfo = JSON.parse(localStorage.getItem('auth') || null);

  return authInfo ? {
    token: authInfo.token,
    user: authInfo.user,
    status: 'INIT',
    error: null,
  } : {
    token: null,
    user: null,
    status: 'INIT',
    error: null,
  };
};

const initialState = getInitialState();

export const login = createAction(LOGIN_REQUEST);
export const signup = createAction(SIGNUP_REQUEST);
export const logout = createAction(LOGOUT_REQUEST, function prepare() {
  localStorage.removeItem('auth');
  return {};
});

export default createReducer(initialState, {
  [requestSuccess(LOGIN_REQUEST)]: (state, { payload }) => ({
    token: payload.token,
    user: payload.user,
    status: requestSuccess(LOGIN_REQUEST),
  }),

  [requestFail(LOGIN_REQUEST)]: (state, { payload }) => ({
    token: null,
    user: null,
    status: requestFail(LOGIN_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(SIGNUP_REQUEST)]: () => ({
    status: requestSuccess(SIGNUP_REQUEST),
  }),

  [requestFail(SIGNUP_REQUEST)]: (state, { payload }) => ({
    status: requestFail(SIGNUP_REQUEST),
    error: payload.error,
  }),

  [LOGOUT_REQUEST]: (state, action) => initialState,
});
