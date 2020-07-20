import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { convertToSnake, convertToCamel } from './naming';

export const requestSuccess = (type) => `${type}_SUCCESS`;

export const requestFail = (type) => `${type}_FAIL`;

export const requestPending = (type) => `${type}_PENDING`;

const defaultHeaders = () => {
  const auth = localStorage.getItem('auth');
  axios.defaults.baseURL = process.env.REACT_APP_API_ROOT + '/';
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = JSON.parse(auth).token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export default ({
  type,
  method,
  path,
  headers,
  success,
  payloadOnSuccess,
}) => function* (action) {
  const {
    body,
    params,
    success: successCallback,
  } = (action.payload || {});

  try {
    yield put({
      type: requestPending(type),
    });

    const res = yield call(axios.request, {
      url: typeof path === 'function' ? path(action) : path,
      method: method.toLowerCase(),
      headers: Object.assign({}, defaultHeaders(), headers),
      data: convertToSnake(body),
      params,
    });
    res.data = convertToCamel(res.data);

    success && success(res.data, action);

    yield put({
      type: requestSuccess(type),
      payload: payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data,
    });

    successCallback && successCallback(res);
  } catch (err) {
    console.log('error: ', err);
    yield put({
      type: requestFail(type),
      payload: { error: err.response },
    });
  }
}
