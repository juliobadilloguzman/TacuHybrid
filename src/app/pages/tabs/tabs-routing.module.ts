import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'faq',
        loadChildren: () => import('../tabs/faq/faq.module').then(m => m.FaqPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/faq',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
