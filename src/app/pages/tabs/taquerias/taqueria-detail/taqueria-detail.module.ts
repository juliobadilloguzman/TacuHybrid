import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaqueriaDetailPageRoutingModule } from './taqueria-detail-routing.module';

import { TaqueriaDetailPage } from './taqueria-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaqueriaDetailPageRoutingModule
  ],
  declarations: [TaqueriaDetailPage]
})
export class TaqueriaDetailPageModule {}
