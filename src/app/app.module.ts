import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { AdminComponent } from './admin/admin.component';
import {appRoutes} from "./app.routing";
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {NoopInterceptor} from "@angular/common/http/src/interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ConferenceOrganizerService} from "./services/conference-organizer.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpeakerComponent,
    AdminComponent,
    HomeComponent
  ],
  imports: [
    RouterModule,
    appRoutes,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ConferenceOrganizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

