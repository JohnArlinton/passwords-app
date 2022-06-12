import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Password } from '../state/passwords/passwords.state';
import { PageState } from '../state/app.state';
import { map, Observable } from 'rxjs';
import { CreatePassword } from '../types/createPassword';

@Injectable({
  providedIn: 'root',
})
export class PasswordsService {
  API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPasswords(): Observable<PageState<Password>> {
    return this.http
      .get<any>(`${this.API}/password-cards`)
      .pipe(map((response) => ({ results: response.result })));
  }

  updatePassword(id: number, password: CreatePassword): Observable<Password> {
    return this.http
      .put<any>(`${this.API}/password-cards/${id}`, password)
      .pipe(
        map((response) => {
          return response.result;
        })
      );
  }

  createPassword(password: CreatePassword): Observable<Password> {
    return this.http.post<any>(`${this.API}/password-cards`, password).pipe(
      map((response) => {
        return response.result;
      })
    );
  }

  deletePassword(id: number) {
    return this.http.delete<any>(`${this.API}/password-cards/${id}`);
  }
}
