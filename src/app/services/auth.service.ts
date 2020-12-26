import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _angularFireAuth: AngularFireAuth) { }

  async logIn(): Promise<any>{

  }

  async signUp(): Promise<any>{

  }

  async logOut(): Promise<void>{
    
  }

  async resetPassword(): Promise<any>{

  }

  async emailAvailable(email: string): Promise<any>{
    return await this._angularFireAuth.fetchSignInMethodsForEmail(email);
  }



}
