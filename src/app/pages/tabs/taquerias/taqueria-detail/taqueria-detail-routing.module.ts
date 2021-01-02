import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaqueriaDetailPage } from './taqueria-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TaqueriaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaqueriaDetailPageRoutingModule {}
