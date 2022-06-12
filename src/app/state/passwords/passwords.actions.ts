import { createAction, props } from '@ngrx/store';
import { CreatePassword } from 'src/app/types/createPassword';
import { PageState } from '../app.state';
import { Password } from './passwords.state';

export const loadPasswords = createAction('loadPasswords');
export const loadPasswordsSuccess = createAction(
  'loadPasswordsSuccess',
  (passwords: PageState<Password>) => ({
    passwords,
  })
);

export const createPassword = createAction(
  'createPassword',
  (password: CreatePassword) => ({
    password,
  })
);
export const createPasswordSuccess = createAction(
  'createPasswordSuccess',
  (password: Password) => ({
    password,
  })
);

export const updatePassword = createAction(
  'updatePassword',
  (id: number, password: CreatePassword) => ({
    id,
    password,
  })
);
export const updatePasswordSuccess = createAction(
  'updatePasswordSuccess',
  (password: Password) => ({
    password,
  })
);

export const deletePassword = createAction('deletePassword', (id: number) => ({
  id,
}));
export const deletePasswordSuccess = createAction(
  'deletePasswordSuccess',
  (id: number) => ({
    id,
  })
);
