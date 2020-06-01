import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'

interface SignupCredantials {
  username: string,
  password: string,
  passwordConfirmation: string
}
interface SignupResponse {
  username: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(false)

  rootUrl = 'https://api.angular-email.com/';

  constructor(private http: HttpClient) {}
  userNameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(
      `${this.rootUrl}auth/username`,
      {
        username: username,
      }
    );
  }

  signup(credantials: SignupCredantials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}auth/signup`, credantials).pipe(
     
      tap(() => {
        this.signedin$.next(true)
      })
    );
  }
}
