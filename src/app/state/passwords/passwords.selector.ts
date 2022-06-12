import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PasswordState } from './passwords.state';

export const selectPasswords = (state: AppState) => state.passwords;
export const selectAllPasswords = createSelector(
  selectPasswords,
  (state: PasswordState) => state
);
