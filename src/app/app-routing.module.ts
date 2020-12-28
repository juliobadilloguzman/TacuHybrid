import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  // {
  //   path: 'auth',
  //   children:[
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       redirectTo: '/auth/login'
  //     },
  //     {
  //       path: 'login',
  //       canLoad:[AuthGuard],
  //       loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  //     },
  //     {
  //       path: 'signup',
  //       canLoad:[AuthGuard],
  //       loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
  //     },
  //     {
  //       path: 'forgot-password',
  //       loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  //     }
  //   ]
  // },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '/auth' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
