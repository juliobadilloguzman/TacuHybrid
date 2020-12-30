import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaqueriasPageRoutingModule } from './taquerias-routing.module';

import { TaqueriasPage } from './taquerias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaqueriasPageRoutingModule
  ],
  declarations: [TaqueriasPage]
})
export class TaqueriasPageModule {}
