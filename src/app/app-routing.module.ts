import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashComponent } from './dash/dash.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'dash', component: DashComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [MenuComponent, DashComponent, ErrorPageComponent];

