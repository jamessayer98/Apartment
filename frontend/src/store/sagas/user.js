import { takeLatest } from 'redux-saga/effects';

import {
  GET_USERS_REQUEST,
  GET_USER_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
} from '../types';
import request  from '../../utils/request';

const getUsers = request({
  type: GET_USERS_REQUEST,
  method: 'get',
  path: '/api/user/',
});

const getUser = request({
  type: GET_USER_REQUEST,
  method: 'get',
  path: ({ payload }) => `/api/user/${payload.id}/`,
});

const createUser = request({
  type: ADD_USER_REQUEST,
  method: 'post',
  path: '/api/user/',
});

const updateUser = request({
  type: UPDATE_USER_REQUEST,
  method: 'patch',
  path: ({ payload }) => `/api/user/${payload.id}/`,
});

const deleteUser = request({
  type: DELETE_USER_REQUEST,
  method: 'delete',
  path: ({ payload }) => `/api/user/${payload.id}/`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
});

export default function* authSaga() {
  yield takeLatest(GET_USERS_REQUEST, getUsers);
  yield takeLatest(GET_USER_REQUEST, getUser);
  yield takeLatest(ADD_USER_REQUEST, createUser);
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}
