import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taqueria } from '../models/taqueria';

@Injectable({
  providedIn: 'root'
})
export class TaqueriaService {

  private _taqueriasCollection: AngularFirestoreCollection<Taqueria>;

  constructor(private _angularFirestore: AngularFirestore) {
    this._taqueriasCollection = _angularFirestore.collection<Taqueria>('TAQUERIA');
  }

  getTaquerias(): Observable<Taqueria[]> {
    return this._taqueriasCollection
      .snapshotChanges()
      .pipe(
        map(response =>
          response.map(a => {
            const data = a.payload.doc.data() as Taqueria;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getTaqueria(id: string): Observable<Taqueria> {
    return this._angularFirestore.doc<Taqueria>(`TAQUERIA/${id}`).valueChanges();
  }

}
