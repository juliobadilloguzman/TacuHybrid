import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onCloseModal(){
    this.modalController.dismiss(null, null, 'terms-conditions');
  }

}
