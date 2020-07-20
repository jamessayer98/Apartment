import { createAction, createReducer } from '@reduxjs/toolkit';

import {
  GET_APARTMENTS_REQUEST,
  GET_APARTMENT_REQUEST,
  ADD_APARTMENT_REQUEST,
  UPDATE_APARTMENT_REQUEST,
  DELETE_APARTMENT_REQUEST,
} from '../types';
import { requestSuccess, requestFail, requestPending } from '../../utils/request';

const initialState = {
  apartments: [],
  apartment: null,
  status: 'INIT',
  error: null,
};

export const getApartments = createAction(GET_APARTMENTS_REQUEST);
export const getApartment = createAction(GET_APARTMENT_REQUEST);
export const addApartment = createAction(ADD_APARTMENT_REQUEST);
export const updateApartment = createAction(UPDATE_APARTMENT_REQUEST);
export const deleteApartment = createAction(DELETE_APARTMENT_REQUEST);

export default createReducer(initialState, {
  [requestSuccess(GET_APARTMENTS_REQUEST)]: (state, { payload }) => ({
    apartments: payload,
    apartment: null,
    status: requestSuccess(GET_APARTMENTS_REQUEST),
    error: null,
  }),

  [requestPending(GET_APARTMENTS_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_APARTMENTS_REQUEST),
  }),

  [requestFail(GET_APARTMENTS_REQUEST)]: (state, { payload }) => ({
    apartments: [],
    apartment: null,
    status: requestFail(GET_APARTMENTS_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(GET_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    apartment: payload,
    status: requestSuccess(GET_APARTMENT_REQUEST),
    error: null,
  }),

  [requestPending(GET_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_APARTMENT_REQUEST),
  }),

  [requestFail(GET_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    apartment: null,
    status: requestFail(GET_APARTMENT_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(ADD_APARTMENT_REQUEST)]: (state, { payload }) => {
    state.apartments.push(payload);
    state.apartment = payload;
    state.status = requestSuccess(ADD_APARTMENT_REQUEST);
    state.error = null;
  },

  [requestFail(ADD_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    apartment: null,
    status: requestFail(ADD_APARTMENT_REQUEST),
    error: payload.error,
  }),

  [requestPending(ADD_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestPending(ADD_APARTMENT_REQUEST),
  }),

  [requestSuccess(UPDATE_APARTMENT_REQUEST)]: (state, { payload }) => {
    const index = state.apartments.findIndex(apartment => apartment.id === payload.id);
    if (index >= 0) state.apartments[index] = payload;
    state.apartment = payload;
    state.status = requestSuccess(UPDATE_APARTMENT_REQUEST);
    state.error = null;
  },

  [requestPending(UPDATE_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_APARTMENT_REQUEST),
  }),

  [requestFail(UPDATE_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    apartment: null,
    status: requestFail(UPDATE_APARTMENT_REQUEST),
    error: payload.error,
  }),

  [requestSuccess(DELETE_APARTMENT_REQUEST)]: (state, { payload }) => {
    state.apartments = state.apartments.filter(apartment => apartment.id !== payload.id);
    state.status = requestSuccess(DELETE_APARTMENT_REQUEST);
    state.error = null;
  },

  [requestPending(DELETE_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_APARTMENT_REQUEST),
  }),

  [requestFail(DELETE_APARTMENT_REQUEST)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_APARTMENT_REQUEST),
    error: payload.error,
  }),
});
