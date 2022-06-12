import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  loadPasswordsSuccess,
  loadPasswords,
  createPassword,
  createPasswordSuccess,
  updatePassword,
  updatePasswordSuccess,
  deletePassword,
  deletePasswordSuccess,
} from './passwords.actions';
import { exhaustMap, map, mergeMap } from 'rxjs';
import { PasswordsService } from 'src/app/services/passwords.service';

@Injectable()
export class PasswordsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private passwordsService: PasswordsService
  ) {}

  loadPasswords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPasswords),
      exhaustMap((req) =>
        this.passwordsService
          .getPasswords()
          .pipe(map((res) => loadPasswordsSuccess(res)))
      )
    );
  });

  createPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createPassword),
      mergeMap((req) =>
        this.passwordsService
          .createPassword(req.password)
          .pipe(map((res) => createPasswordSuccess(res)))
      )
    );
  });

  updatePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePassword),
      mergeMap((req) =>
        this.passwordsService
          .updatePassword(req.id, req.password)
          .pipe(map((res) => updatePasswordSuccess(res)))
      )
    );
  });

  deletePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePassword),
      mergeMap((req) =>
        this.passwordsService
          .deletePassword(req.id)
          .pipe(map(() => deletePasswordSuccess(req.id)))
      )
    );
  });
}
