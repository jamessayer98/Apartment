import { all } from 'redux-saga/effects';
import auth from './auth';
import apartment from './apartment';
import user from './user';

export default function* rootSaga () {
  yield all([
    auth(),
    apartment(),
    user(),
  ]);
};
