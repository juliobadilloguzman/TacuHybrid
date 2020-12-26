import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UniqueEmail } from '../../../validators/unique-email';
import * as moment from 'moment';
import { MatchPassword } from 'src/app/validators/match-password';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm: FormGroup;
  termsAccepted: boolean;

  constructor(
    private fb: FormBuilder,
    private matchPasswordValidator: MatchPassword,
    private uniqueEmailValidator: UniqueEmail,
    private alertController: AlertController
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
      contraConfirmation: ['', [
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
      creacion: [moment().format(), [
        Validators.required
      ]
    ]
  
    }, {validators: [this.matchPasswordValidator.validate]});

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

  get contraConfirmation(){
    return this.signUpForm.get('contraConfirmation');
  }

  get nacimiento(){
    return this.signUpForm.get('nacimiento');
  }

  get telefono(){
    return this.signUpForm.get('telefono');
  }

  onSetTerminos(event:boolean){
    this.termsAccepted = event;
  }

  showErrors(control: FormControl): boolean{
    const { dirty, touched, errors } =  control;
    return dirty && touched && !!errors;
  }

  async showAlertTerms() {
    const alert = await this.alertController.create({
      header: 'Acepta los términos y condiciones',
      message: 'Para continuar, debe de aceptar los términos y condiciones.',
      buttons: ['Entendido']
    });

    await alert.present();
  }

  onSignUp(): void{
    
    //if(!this.signUpForm.valid) return;

    if(!this.termsAccepted)
      this.showAlertTerms();


    console.warn(this.signUpForm.value);

  }

}
