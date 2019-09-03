import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DashComponent } from './dash/dash.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatchAddComponent } from './match-add/match-add.component';
import { MatchGetComponent } from './match-get/match-get.component';
import { MatchEditComponent } from './match-edit/match-edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'dash', component: DashComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'get', component: MatchGetComponent},
  {path: 'edit/:id', component: MatchEditComponent},
  {path: 'add', component: MatchAddComponent},
  {path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [MenuComponent, DashComponent, ErrorPageComponent,
  MatchAddComponent, MatchEditComponent, MatchGetComponent,LoginComponent];

