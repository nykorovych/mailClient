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
interface SigninResponse {
  authenticated: boolean,
  username: string

}
interface SigninCredentials{
  username: string,
  password: string

}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(null)

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
  chechAuth(){
    return this.http.get<SigninResponse>(`${this.rootUrl}auth/signedin`)
    .pipe(
      tap(({authenticated}) => {
        this.signedin$.next(authenticated)
      }) 
    )
  }
  signeout() {
    // PORT REQUEST HAS TO HAVE A BODY EVEN IF IT'S EMPTY
     return this.http.post<any>(`${this.rootUrl}auth/signout`, {})
    .pipe(
      tap(()=>{
        this.signedin$.next(false)
      })
    )
  }
  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}auth/signin`, credentials)
    .pipe(
      tap(()=>{
        this.signedin$.next(true)
      })
    )
  }
}
