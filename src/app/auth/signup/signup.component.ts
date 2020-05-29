import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniquUsername } from '../validators/uniqu-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniquUsername.validate]
      ),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.match.validate] }
  );

  constructor(
    public match: MatchPassword,
    private uniquUsername: UniquUsername
  ) {}

  ngOnInit(): void {}
}
