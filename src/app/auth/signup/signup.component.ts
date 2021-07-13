import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { CheckUsername } from '../validators/check-username';
import { AuthService } from '../../Services/Auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private matchPassword : MatchPassword, private checkUsername : CheckUsername, private authService :AuthService) { }

 
  authForm = new FormGroup({
    username : new FormControl('',[
      Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern(/^[a-z0-9]+$/)
    ],[this.checkUsername.validate]),
    password : new FormControl('',[
      Validators.required, Validators.minLength(5), Validators.maxLength(20)
    ]),
    passwordConfirm : new FormControl('',[
      Validators.required, Validators.minLength(5), Validators.maxLength(20)
    ])
  }, {validators : [this.matchPassword.validate]});
  

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: response => {
        // Navigate to some other route
      },
      error: err => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

}
