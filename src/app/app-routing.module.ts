import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuardFacebookGuard } from './guard/guard-facebook.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'folder/:id',
    canActivate: [GuardFacebookGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'temperatura',
    canActivate:[GuardFacebookGuard],
    loadChildren: () => import('./temperatura/temperatura.module').then( m => m.TemperaturaPageModule)
  },
  {
    path: 'user',
    canActivate:[GuardFacebookGuard],
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
