import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaqueriasPage } from './taquerias.page';

const routes: Routes = [
  {
    path: '',
    component: TaqueriasPage
  },
  {
    path: 'taqueria-detail',
    loadChildren: () => import('./taqueria-detail/taqueria-detail.module').then( m => m.TaqueriaDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaqueriasPageRoutingModule {}
