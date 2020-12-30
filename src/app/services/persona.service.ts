import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private firestore: AngularFirestore) { }

  async createPersona(persona: Persona): Promise<any>{
    return await this.firestore.collection('PERSONA').add(persona);
  }

}
