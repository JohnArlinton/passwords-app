import { PasswordState } from './passwords/passwords.state';

export interface AppState {
  passwords: PasswordState;
}

export interface PageState<T> {
  results: T[];
}
