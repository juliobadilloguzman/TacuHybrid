import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private _uiActionsService: UiActionsService) { }

  ngOnInit(): void{
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email(){
    return this.forgotPasswordForm.get('email');
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  async onChangePassword(){

    await this._uiActionsService.presentLoading('Enviando correo...').then(loading => {

      loading.present();

      this._authService.changePassword(this.email.value).then(response => {
        loading.dismiss();
        this.forgotPasswordForm.reset();
        this._uiActionsService.presentToast('Correo enviado satisfactoriamente.', true, 2000, null, 'success');
      }).catch(error => {

        switch (error.code) {
  
          case 'auth/invalid-email':
            this._uiActionsService.presentToast('Introduzca un formato de correo válido.', true, 2000, null, 'primary');
            loading.dismiss();
            break;
  
          case 'auth/user-not-found':
            this._uiActionsService.presentToast('No existe una cuenta asociada a este correo', true, 2000, null, 'primary');
            loading.dismiss();
            break;
  
          default:
            this._uiActionsService.presentToast('Hubo un error al mandar el correo.', true, 2000, null, 'primary');
            loading.dismiss();
            break;
        }
      });

    });

    
  }

}
