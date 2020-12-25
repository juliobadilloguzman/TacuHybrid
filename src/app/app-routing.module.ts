import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login'
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
      }
    ]
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/tabs/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
