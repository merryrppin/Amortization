import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';// for AngularFireAuth
import { AngularFireDatabase } from 'angularfire2/database';// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(         //////main module
      environment.firebase
    ),                                       
    AngularFireDatabaseModule,                ////// for database 
    AngularFireAuthModule                     ////// for auth
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
