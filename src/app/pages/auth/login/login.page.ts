import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email
        ]
      ],
      password: ['', [
        Validators.required, 
        Validators.minLength(4)
        ]
      ]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  showErrors(control: FormControl): boolean{

    const { dirty, touched, errors } =  control;

    return dirty && touched && !!errors;

  }

  onLogin(){
    console.warn(this.loginForm.value);
  }

}
