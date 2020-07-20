import reducer from '../auth';
import * as types from '../../types';
import { requestSuccess } from '../../../utils/request';

describe('Auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      user: null,
      status: 'INIT',
      error: null,
    });
  });

  it('should handle success LOGIN_REQUEST', () => {
    const mockData = {
      token: 'token',
      user: {
        id: 1,
        firstName: 'Hideo',
        lastName: 'Suzuki',
        username: 'hideo',
        role: 'CLIENT',
      },
    }
    const { token, user } = mockData;

    expect(reducer([], {
      type: requestSuccess(types.LOGIN_REQUEST),
      payload: {
        token,
        user,
      },
    })).toEqual({
      ...mockData,
      status: requestSuccess(types.LOGIN_REQUEST),
    });
  });
});