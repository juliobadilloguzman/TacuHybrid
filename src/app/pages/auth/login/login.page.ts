import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _uiActionsService: UiActionsService,
    private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['', [
        Validators.required
      ]
      ]
    });

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  resetForm() {
    this.loginForm.reset();
  }

  async onLogin() {

    await this._uiActionsService.presentLoading('Iniciando sesión...').then(loading => {

      loading.present();

      this._authService.logIn(this.email.value, this.password.value).subscribe(

        (response: any) => {

          if (response) {
            this.router.navigateByUrl('/tabs/faq');
            loading.dismiss();
            this.loginForm.reset();
          } else {
            this._uiActionsService.presentToast('Hubo un error al intentar iniciar sesión.', true, 2000, null, 'secondary');
            loading.dismiss();
          }

        },
        (error) => {

          switch (error.error.error.message) {

            case 'EMAIL_NOT_FOUND':
              this._uiActionsService.presentToast('No existe una cuenta asociada a este correo.', true, 2000, null, 'secondary');
              loading.dismiss();
              break;

            case 'INVALID_PASSWORD':
              this._uiActionsService.presentToast('Usuario o contraseña incorrectos.', true, 2000, null, 'secondary');
              loading.dismiss();
              break;

            case 'USER_DISABLED':
              this._uiActionsService.presentToast('Su cuenta ha sido deshabilitada por el administrador.', true, 2000, null, 'secondary');
              loading.dismiss();
              break;

            case 'MISSING_PASSWORD':
              this._uiActionsService.presentToast('Introduzca una contraseña para iniciar sesión.', true, 2000, null, 'secondary');
              loading.dismiss();
              break;

            default:
              this._uiActionsService.presentToast('Hubo un error al intentar iniciar sesión.', true, 2000, null, 'secondary');
              loading.dismiss();
              break;
          }


        }
      );

    });

  }

}
