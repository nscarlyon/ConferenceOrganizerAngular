import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, ActivatedRoute} from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { AdminProposalsComponent } from './admin/admin-proposals/admin-proposals.component';
import {appRoutes} from "./app.routing";
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {ConferenceOrganizerService} from "./services/conference-organizer.service";
import { AdminScheduleComponent } from './admin/admin-schedule/admin-schedule.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminSessionComponent } from './admin/admin-session/admin-session.component';
import {RouterTestingModule} from "@angular/router/testing";
import {LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpeakerComponent,
    AdminProposalsComponent,
    HomeComponent,
    AdminScheduleComponent,
    AdminHomeComponent,
    AdminSessionComponent
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

