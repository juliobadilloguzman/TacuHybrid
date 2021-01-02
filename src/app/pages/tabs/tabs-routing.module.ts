import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/faq',
        pathMatch: 'full'
      },
      {
        path: 'faq',
        loadChildren: () => import('../tabs/faq/faq.module').then(m => m.FaqPageModule)
      },
      {
        path: 'taquerias',
        loadChildren: () => import('./taquerias/taquerias.module').then(m => m.TaqueriasPageModule)
      },
      {
        path: 'taquerias/:taqueriaId',
        loadChildren: () => import('./taquerias/taqueria-detail/taqueria-detail.module').then(m => m.TaqueriaDetailPageModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule)
      },
      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
