import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';

import LoginPage from './Login';
import createRootReducer from '../../store/reducers';

configure({ adapter: new Adapter() });

describe('LoginPage', () => {
  const history = createBrowserHistory();
  const mockStore = createStore(
    createRootReducer(history),
    { auth: {} },
  );
  mockStore.dispatch = jest.fn();
  const getWrapper = () => mount(
    <Provider store={mockStore}>
      <ConnectedRouter history={history}>
        <LoginPage />
      </ConnectedRouter>
    </Provider>
  );

  it('tests LoginPgae functionality', async () => {
    const wrapper = getWrapper();
    const crendetials = {
      username: 'hideo',
      password: 'password',
    };
    const { username, password } = crendetials;

    wrapper.find('input[name="username"]')
      .simulate('change', { target: { value: username } });
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { value: password } });

    expect(
      wrapper.find('input[name="username"]').prop('value')
    ).toEqual(username);
    expect(
      wrapper.find('input[name="password"]').prop('value')
    ).toEqual(password);

    wrapper.find('form').simulate('submit');
    await act(() => Promise.resolve());
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
