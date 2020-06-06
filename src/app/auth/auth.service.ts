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
interface SigninResponse {
  username: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(null)
  username: string

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
     
      tap((res) => {
        this.signedin$.next(true)
        this.username = res.username
      })
    );
  }
  chechAuth(){
    return this.http.get<SigninResponse>(`${this.rootUrl}auth/signedin`)
    .pipe(
      tap(({authenticated, username}) => {
        this.signedin$.next(authenticated)
        this.username = username

      }) 
    )
  }
  signeout() {
    // POST REQUEST HAS TO HAVE A BODY EVEN IF IT'S EMPTY
     return this.http.post<any>(`${this.rootUrl}auth/signout`, {})
    .pipe(
      tap(()=>{
        this.signedin$.next(false)
      })
    )
  }
  signin(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(`${this.rootUrl}auth/signin`, credentials)
    .pipe(
      tap((res)=>{
        this.signedin$.next(true)
        this.username = res.username
      })
    )
  }
}
