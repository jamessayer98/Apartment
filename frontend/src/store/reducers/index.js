import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AuthReducer from './auth';
import ApartmentReducer from './apartment';
import UserReducer from './user';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
  apartment: ApartmentReducer,
  user: UserReducer,
});
