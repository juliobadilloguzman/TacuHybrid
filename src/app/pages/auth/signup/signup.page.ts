import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UniqueEmail } from '../../../validators/unique-email';
import * as moment from 'moment';
import { MatchPassword } from 'src/app/validators/match-password';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

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
    private modalController: ModalController,
    private _authService: AuthService,
    private _uiActionsService: UiActionsService,
    private _personaService: PersonaService,
    private router: Router
  ) { }

  ngOnInit(): void {

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
        Validators.minLength(6)
      ]
      ],
      contraConfirmation: ['', [
        Validators.required,
        Validators.minLength(6)
      ]
      ],
      nacimiento: ['', [
        Validators.required
      ]
      ],
      telefono: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ]
      ],
      creacion: [moment(new Date()).locale('es').format('LLLL'), [
        Validators.required
      ],
      ],
    }, { validators: [this.matchPasswordValidator.validate] });

  }

  get nombre() {
    return this.signUpForm.get('nombre');
  }

  get apellidos() {
    return this.signUpForm.get('apellidos');
  }

  get sexo() {
    return this.signUpForm.get('sexo');
  }

  get correo() {
    return this.signUpForm.get('correo');
  }

  get contra() {
    return this.signUpForm.get('contra');
  }

  get contraConfirmation() {
    return this.signUpForm.get('contraConfirmation');
  }

  get nacimiento() {
    return this.signUpForm.get('nacimiento');
  }

  get telefono() {
    return this.signUpForm.get('telefono');
  }

  get creacion() {
    return this.signUpForm.get('creacion');
  }

  onSetTerminos(event: boolean): void {
    this.termsAccepted = event;
  }

  async openTermsAndConditions() {
    const modal = await this.modalController.create({
      component: TermsConditionsComponent,
      id: 'terms-conditions'
    });
    await modal.present();
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  resetForm() {
    this.signUpForm.reset();
    this.termsAccepted = false;
  }


  async onSignUp() {

    if (!this.signUpForm.valid) return;

    if (!this.termsAccepted)
      this._uiActionsService.presentAlert('Para continuar, debes de aceptar los terminos y condiciones.', ['Entendido'], 'Terminos y Condiciones');
    else {
      await this._uiActionsService.presentLoading('Registrando usuario...').then(loading => {

        loading.present();

        this._authService.signUp(this.correo.value, this.contra.value).subscribe(

          (response: any) => {

            //Si lo agregó correcamente, lo agrega a la base de datos
            if (response) {

              const persona: Persona = {
                id: response.localId,
                nombre: this.nombre.value,
                apellidos: this.apellidos.value,
                sexo: this.sexo.value,
                correo: this.correo.value,
                nacimiento: moment(this.nacimiento.value).locale('es').format('L'),
                telefono: this.telefono.value,
                creacion: this.creacion.value,
                taqueriasVisitadas: 0,
                primeraVezLoggeado: true
              };

              this._personaService.createPersona(persona).then((response) => {
                
                  loading.dismiss();
                  this._uiActionsService.presentToast('Usuario registrado satisfactoriamente', true, 2000, null, 'success');
                  this.resetForm();
                  setTimeout(() => {
                    this.router.navigateByUrl('/login');
                  }, 1500);
            
              });

            } else {
              this._uiActionsService.presentToast('El registro falló, inténtelo de nuevo.', true, 2000, null, 'secondary');
              loading.dismiss();
            }

          },
          (error) => {

            switch (error.error.error.message) {

              case 'EMAIL_EXISTS':
                this._uiActionsService.presentToast('El correo a registrar ya esta en uso.', true, 2000, null, 'secondary');
                loading.dismiss();
                break;

              case 'INVALID_EMAIL':
                this._uiActionsService.presentToast('Introduzca un formato de correo correcto.', true, 2000, null, 'secondary');
                loading.dismiss();
                break;

              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                this._uiActionsService.presentToast('Hemos bloqueado el registro desde este dispositivo debido a actividad insual.', true, 2000, null, 'secondary');
                loading.dismiss();
                break;

              default:
                this._uiActionsService.presentToast('El registro falló, inténtelo de nuevo.', true, 2000, null, 'secondary');
                loading.dismiss();
                break;
            }
          }
        );
      });
    }

  }

}
