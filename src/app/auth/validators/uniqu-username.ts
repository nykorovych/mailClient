import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniquUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate = (control: FormControl) => {
    const { value } = control;
    return this.authService.userNameAvailable(value).pipe(
      map((value) => {
        if (value.available) return null;
      }),
      catchError((err) => {
        console.log(err);
        return of({ nouniqueUser: true });
      })
    );
  };
}
