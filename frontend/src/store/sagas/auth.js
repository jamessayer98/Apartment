import { takeLatest } from 'redux-saga/effects';

import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../types';
import request  from '../../utils/request';

const login = request({
  type: LOGIN_REQUEST,
  method: 'post',
  path: '/api/login/',
  success: (res, action) => {
    localStorage.setItem('auth', JSON.stringify(res));
  },
});

const signup = request({
  type: SIGNUP_REQUEST,
  method: 'post',
  path: 'api/signup/',
});

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SIGNUP_REQUEST, signup);
}
