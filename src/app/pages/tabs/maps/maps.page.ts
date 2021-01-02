import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  constructor(private _personaService: PersonaService, private _authService: AuthService) { }

  async ngOnInit() {
    //Actualizar el primeraVezLoggeado
    await this._authService.userUid.subscribe((userId: string) => {
      this._personaService.getPersona(userId).subscribe((response: Persona) => {
        if(response){
          if(response.primeraVezLoggeado){
            setTimeout(() => {
              this._personaService.updateFirstTimeLogged(userId, {primeraVezLoggeado: false}).then();
            }, 1500);
          }
        }
      });      
    });
  }

}
