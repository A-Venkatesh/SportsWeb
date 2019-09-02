import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';



import {MatSidenavModule} from '@angular/material/sidenav';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    SlimLoadingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
