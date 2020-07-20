import { takeLatest } from 'redux-saga/effects';

import {
  GET_APARTMENTS_REQUEST,
  GET_APARTMENT_REQUEST,
  ADD_APARTMENT_REQUEST,
  UPDATE_APARTMENT_REQUEST,
  DELETE_APARTMENT_REQUEST,
} from '../types';
import request  from '../../utils/request';

const getApartments = request({
  type: GET_APARTMENTS_REQUEST,
  method: 'get',
  path: '/api/apartment/',
});

const getApartment = request({
  type: GET_APARTMENT_REQUEST,
  method: 'get',
  path: ({ payload }) => `/api/apartment/${payload.id}/`,
});

const createApartment = request({
  type: ADD_APARTMENT_REQUEST,
  method: 'post',
  path: '/api/apartment/',
});

const updateApartment = request({
  type: UPDATE_APARTMENT_REQUEST,
  method: 'put',
  path: ({ payload }) => `/api/apartment/${payload.id}/`,
});

const deleteApartment = request({
  type: DELETE_APARTMENT_REQUEST,
  method: 'delete',
  path: ({ payload }) => `/api/apartment/${payload.id}/`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
});

export default function* authSaga() {
  yield takeLatest(GET_APARTMENTS_REQUEST, getApartments);
  yield takeLatest(GET_APARTMENT_REQUEST, getApartment);
  yield takeLatest(ADD_APARTMENT_REQUEST, createApartment);
  yield takeLatest(UPDATE_APARTMENT_REQUEST, updateApartment);
  yield takeLatest(DELETE_APARTMENT_REQUEST, deleteApartment);
}
