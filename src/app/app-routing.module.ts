import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DashComponent } from './dash/dash.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatchAddComponent } from './match-add/match-add.component';
import { MatchGetComponent } from './match-get/match-get.component';
import { MatchEditComponent } from './match-edit/match-edit.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';



const routes: Routes = [
  {path: '', component: MatchGetComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'dash', component: DashComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'get', component: MatchGetComponent},
  {path: 'edit/:id', component: MatchEditComponent},
  {path: 'add', component: MatchAddComponent},
  {path: 'registration', component: SignUpComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileViewComponent
  },
  {
    path: 'profile/edit',
    component: ProfileEditComponent
  },
  {path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [MenuComponent, DashComponent, ErrorPageComponent,
  MatchAddComponent, MatchEditComponent, MatchGetComponent, SignUpComponent, RegisterComponent,
  LoginComponent, ProfileViewComponent, ProfileEditComponent, ];

