import { Validator, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class MatchPassword implements Validator {

    validate(formGroup: FormGroup){

        const { contra, contraConfirmation} =  formGroup.value;

        if(contra == contraConfirmation) return null; else return {passwordsDontMatch: true}; 
   
    }

}
