import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { AdminComponent } from './admin/admin.component';
import {appRoutes} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpeakerComponent,
    AdminComponent
  ],
  imports: [
    RouterModule,
    appRoutes,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
