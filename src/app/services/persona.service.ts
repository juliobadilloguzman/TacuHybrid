import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Persona } from '../models/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private _angularFirestore: AngularFirestore) { }

  getPersona(idPersona: string): Observable<Persona>{
     return this._angularFirestore.doc<Persona>(`PERSONA/${idPersona}`).valueChanges();
  }

  async updateFirstTimeLogged(idPersona: string, persona: any): Promise<any>{
    return await this._angularFirestore.doc<Persona>(`PERSONA/${idPersona}`).update(persona);
  }

  async createPersona(persona: Persona): Promise<any>{
    return await this._angularFirestore.collection('PERSONA').doc(persona.id).set(persona);
  }

}
