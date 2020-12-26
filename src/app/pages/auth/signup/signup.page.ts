import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UniqueEmail } from '../../../validators/unique-email';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _angularFireAuth: AngularFireAuth,
    private uniqueEmailValidator: UniqueEmail
  ) { }

  ngOnInit() {

    this.signUpForm = this.fb.group({

      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(2),
      ]
    ],
      apellidos: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(4)
      ]
    ],
      sexo: ['', [
        Validators.required
      ]
    ],
      correo: ['', [
        Validators.required,
        Validators.email
      ],
      [this.uniqueEmailValidator.validate]
    ],
      contra: ['', [
        Validators.required,
        Validators.minLength(4)
      ]
    ],
      nacimiento: ['', [
        Validators.required
      ]
    ],
      telefono: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]
    ],
      creacion: [moment().format("YYYY Do MMM"), [
        Validators.required
      ]
    ]
  
    });
  }

  get nombre(){
    return this.signUpForm.get('nombre');
  }

  get apellidos(){
    return this.signUpForm.get('apellidos');
  }

  get sexo(){
    return this.signUpForm.get('sexo');
  }

  get correo(){
    return this.signUpForm.get('correo');
  }

  get contra(){
    return this.signUpForm.get('contra');
  }

  get nacimiento(){
    return this.signUpForm.get('nacimiento');
  }

  get telefono(){
    return this.signUpForm.get('telefono');
  }

  onSignUp(): void{
    
    //if(!this.signUpForm.valid) return;

    console.warn(this.signUpForm.value);

  }

  showErrors(control: FormControl): boolean{

    const { dirty, touched, errors } =  control;

    return dirty && touched && !!errors;

  }

}
