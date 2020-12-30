import { Component, OnInit } from '@angular/core';
import { TaqueriaService } from 'src/app/services/taqueria.service';

@Component({
  selector: 'app-taquerias',
  templateUrl: './taquerias.page.html',
  styleUrls: ['./taquerias.page.scss'],
})
export class TaqueriasPage implements OnInit {

  constructor(private _taqueriaService: TaqueriaService) { }

  ngOnInit() {

  }

}
