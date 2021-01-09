import { Component, OnInit } from '@angular/core';
import { TaqueriaService } from 'src/app/services/taqueria.service';
import { Taqueria } from 'src/app/models/taqueria';

@Component({
  selector: 'app-taquerias',
  templateUrl: './taquerias.page.html',
  styleUrls: ['./taquerias.page.scss'],
})
export class TaqueriasPage implements OnInit {

  taquerias: Taqueria[];

  constructor(private _taqueriaService: TaqueriaService) { }

  async ngOnInit() {
    await this._taqueriaService.getTaquerias().subscribe((response) => {
      this.taquerias = response;
      console.warn(this.taquerias);
    });
  }



}
