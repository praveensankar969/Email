import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { CheckUsername } from '../validators/check-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private matchPassword : MatchPassword, private checkUsername : CheckUsername) { }

 
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

}
