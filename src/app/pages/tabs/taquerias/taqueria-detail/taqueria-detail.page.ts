import { Component, OnInit } from '@angular/core';
import { Taqueria } from 'src/app/models/taqueria';
import { TaqueriaService } from 'src/app/services/taqueria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taqueria-detail',
  templateUrl: './taqueria-detail.page.html',
  styleUrls: ['./taqueria-detail.page.scss'],
})
export class TaqueriaDetailPage implements OnInit {

  idTaqueria: string;
  taqueria: Taqueria;

  constructor(private _taqueriaService: TaqueriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    if (!this.route.snapshot.params.taqueriaId || this.route.snapshot.params.taqueriaId == '' || this.route.snapshot.params.taqueriaId == undefined)
      this.router.navigateByUrl('/tabs/taquerias');

    this.idTaqueria = this.route.snapshot.params.taqueriaId;

    this._taqueriaService.getTaqueria(this.idTaqueria).subscribe((response) => {
      this.taqueria = response;
      console.warn(this.taqueria);
    });

  }

}
