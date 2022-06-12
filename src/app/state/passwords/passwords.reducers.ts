import { Action, createReducer, on } from '@ngrx/store';

import {
  loadPasswordsSuccess,
  deletePasswordSuccess,
  createPasswordSuccess,
  updatePasswordSuccess,
} from './passwords.actions';
import { initialState, PasswordState, Password } from './passwords.state';

const _passwordsReducer = createReducer(
  initialState,
  on(loadPasswordsSuccess, (state, { passwords }) => {
    return {
      ...state,
      passwords: {
        results: [...passwords.results],
      },
    };
  }),
  on(deletePasswordSuccess, (state, { id }) => {
    const newPasswords = state.passwords.results.filter((el) => el.id != id);
    return {
      ...state,
      passwords: {
        results: [...newPasswords],
      },
    };
  }),
  on(createPasswordSuccess, (state, { password }) => {
    return {
      ...state,
      passwords: {
        results: [...state.passwords.results, password],
      },
    };
  }),
  on(updatePasswordSuccess, (state, { password }) => {
    var newPasswords = state.passwords.results.map<Password>((item) => {
      return (item = item.id === password.id ? password : item);
    });

    return {
      ...state,
      passwords: {
        results: [...newPasswords],
      },
    };
  })
);

export function passwordsReducer(
  state: PasswordState | undefined,
  action: Action
) {
  return _passwordsReducer(state, action);
}
