import { PageState } from '../app.state';

export interface Password {
  id: number;
  url: string;
  name: string;
  username: string;
  password: string;
}

export interface PasswordState {
  passwords: PageState<Password>;
}
export const initialState: PasswordState = {
  passwords: {
    results: [],
  } as PageState<Password>,
};
