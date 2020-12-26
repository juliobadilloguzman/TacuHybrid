import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: "root",
})
export class UniqueEmail implements AsyncValidator {

  constructor(private _authService: AuthService) {}

  validate = (control: FormControl) => {

    const { value } = control;
 
    return this._authService.emailAvailable(value).then(signInMethods => {

        if (signInMethods.length > 0) {
          return {nonUniqueEmail: true};
        } else {
          return null;
        }

    }).catch((error) => {

        if(error.code == 'auth/network-request-failed')
            return {noConnection: true};

    });

  };

}
