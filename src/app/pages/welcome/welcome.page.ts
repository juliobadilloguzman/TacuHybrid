import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { AuthService } from 'src/app/services/auth.service';
import { Plugins } from '@capacitor/core';
import { Persona } from 'src/app/models/persona';
import { Router } from '@angular/router';
import { take, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private _personaService: PersonaService, private _authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this._authService.userUid.subscribe((userId: string) => {
      this._personaService.getPersona(userId).subscribe((response: Persona) => {
        if(response){
          if(!response.primeraVezLoggeado){
            this.router.navigateByUrl('/tabs/maps');
          }
        }
      });
    });
  }

}
